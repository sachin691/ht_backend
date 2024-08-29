const express = require("express");
const { createLanguage } = require("../controllers/adminsController");

const router = express.Router();

// Route for creating a new language
router.post("/create-language", createLanguage);

module.exports = router;
