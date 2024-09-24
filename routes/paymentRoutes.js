const express = require("express");
const { createOrder } = require("../controllers/paymentsController");

const router = express.Router();

router.post("/payment/orders", createOrder);

module.exports = router;
