
const express = require("express");
const { createUser, requestDemoMail } = require("../controllers/usersController");

const router = express.Router();

router.post("/create", createUser);
router.post("/request-demo", requestDemoMail);


module.exports = router;
