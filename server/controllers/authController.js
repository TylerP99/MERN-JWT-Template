const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");


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

    res.json(user);
});

const authenticateUser = AsyncHandler( async (req, res) => {
    res.json({msg: "Authenticate"});
});

const refreshToken = AsyncHandler( async (req, res) => {
    res.json({msg: "Refresh"});
});

const logoutUser = AsyncHandler( async (req, res) => {
    res.json({msg: "Logout"});
});

module.exports = {
    registerUser,
    authenticateUser,
    refreshToken,
    logoutUser,
}