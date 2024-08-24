// routes/userRoutes.js

const express = require("express");
const { createUser } = require("../controllers/usersController");

const router = express.Router();

// Route for creating a new user
router.post("/create", createUser);

module.exports = router;
