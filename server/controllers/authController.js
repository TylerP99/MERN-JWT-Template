const AsyncHandler = require("express-async-handler");

const registerUser = AsyncHandler( async (req, res) => {
    console.log("Register");
});

const authenticateUser = AsyncHandler( async (req, res) => {
    console.log("Authenticate");
});

const refreshToken = AsyncHandler( async (req, res) => {
    console.log("Refresh");
});

const logoutUser = AsyncHandler( async (req, res) => {
    console.log("Logout");
});

module.exports = {
    registerUser,
    authenticateUser,
    refreshToken,
    logoutUser,
}