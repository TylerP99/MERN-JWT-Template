const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3500;

const app = express();

app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));