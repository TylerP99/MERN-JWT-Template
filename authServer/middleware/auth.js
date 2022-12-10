const AsyncHandler = require("express-async-handler");

const protectRoute = AsyncHandler( async (req, res, next) => {

    // Check auth header for access token

    // If no token, deny access

    // Verify token

    // If verify fails, deny access

    // Get user, add to req.user

    // Next

});

module.exports = {
    protectRoute,
}