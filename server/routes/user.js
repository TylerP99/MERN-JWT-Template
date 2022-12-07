const express = require("express");
const router = express.Router();

const {registerUser, authenticateUser, refreshToken, logoutUser} = require("../controllers/authController.js");

// Register user
router.post("/register", registerUser);

// Authenticate user
router.post("/authenticate", authenticateUser);

// Refresh auth token
router.post("/refresh", refreshToken);

// Log out user
router.delete("/logout", logoutUser);

module.exports = router;