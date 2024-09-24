const express = require("express");
const { createLanguage, getLanguage } = require("../controllers/adminsController");

const router = express.Router();

// Route for creating a new language
router.post("/create-language", createLanguage);
router.get("/language/:name", getLanguage);


module.exports = router;
