const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3500;

const app = express();

// Connect to db
require("./config/connectDB")();

// Request Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));