const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;