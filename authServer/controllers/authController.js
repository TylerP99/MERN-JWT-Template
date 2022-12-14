const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");



const registerUser = AsyncHandler( async (req, res) => {
    // Get user information from request body
    const {email, password, password2} = req.body;

    // Validate each field
    const errors = [];

    if(!email) errors.push("Email is required");

    const existing = await User.findOne({email: email});

    if(existing) errors.push("Email already in use");

    if(!password) errors.push("Password field is required");

    if(password !== password2) errors.push("Passwords must match");

    if(errors.length) return res.status(400).json(errors);

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in database
    const user = await User.create({email, password: hashedPassword});

    // Create JWT tokens
    const refreshToken = genRefreshToken({id: user._id});
    const accessToken = genAccessToken({id: user._id});

    // Store refresh token
    await RefreshToken.create({token: refreshToken});

    // Respond with tokens and user info
    res.status(201).json({
        user: {
            email: user.email,
        },
        access: accessToken,
        refresh: refreshToken, // This will go into httpOnly cookie later
    })
});

const authenticateUser = AsyncHandler( async (req, res) => {

    // Get credentials from request body
    const {email, password} = req.body;


    // Validate fields (check if filled)
    const errors = [];

    if(!email) errors.push("Email field required");
    if(!password) errors.push("Password field required");

    if(errors.length) return res.status(400).json(errors);

    // Get user from database
    const user = await User.findOne({email});

    // If no user, error
    if(!user) errors.push("A user with that email does not exist");

    if(errors.length) return res.status(400).json(errors);

    // Compare provided password with entered password
    const match = await bcrypt.compare(password, user.password);

    // If not matching, error
    if(!match) errors.push("That password is incorrect");

    if(errors.length) return res.status(400).json(errors);

    // Generate tokens
    const refreshToken = genRefreshToken({id: user._id});
    const accessToken = genAccessToken({id: user._id});

    // Store refresh token
    await RefreshToken.create({token: refreshToken});

    // Respond with user info and tokens
    res.status(200).json({
        user: {
            email: user.email
        },
        access: accessToken,
        refresh: refreshToken,
    });
});

const refreshToken = AsyncHandler( async (req, res) => {

    // Check for refresh token in authorization header, if no token, respond
    if(!req.headers.authorization?.startsWith("Bearer")) return res.status(401).json(["No refresh token"]);

    // Verify token
    const token = req.headers.authorization.split(" ")[1];

    // Check if token is in db before allowing its use
    const dbToken = await RefreshToken.findOne({token});

    if(!dbToken) return res.status(401).json(["Token revoked"]);

    jwt.verify( token, process.env.JWT_REFRESH_SECRET, 
        async (err, decoded) => {
            // If not verified, respond
            if(err) return res.status(401).json(["Unauthorized, bad token"]);

            const user = await User.findById(decoded.id);

            // Gen access
            const accessToken = genAccessToken({id: user._id});

            // Respond with access
            res.json({access: accessToken});
        }
    );

});

const logoutUser = AsyncHandler( async (req, res) => {

    // Later, will destroy cookie here

    // For now, just delete refresh token from db
    const token = req.body.refresh;

    if(!token) return res.status(400).json(["No session detected"]);

    const dbToken = await RefreshToken.findOneAndDelete({token});

    if(!dbToken) return res.status(400).json(["No session detected"]);

    res.json({msg: "Logout"});
});



const genRefreshToken = (payload) => {
    return jwt.sign(payload,
        process.env.JWT_REFRESH_SECRET, 
        {expiresIn: "7d"}
    );
}

const genAccessToken = (payload) => {
    return jwt.sign(payload,
        process.env.JWT_ACCESS_SECRET, 
        {expiresIn: "15m"}
    );
}

module.exports = {
    registerUser,
    authenticateUser,
    refreshToken,
    logoutUser,
}