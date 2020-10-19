const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const cat = require("../models/burger.js");

// Export routes for server.js to use.
module.exports = router;