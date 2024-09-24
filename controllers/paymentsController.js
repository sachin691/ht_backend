const Razorpay = require("razorpay");
const { Order } = require("../models/"); // Sequelize Order model
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { name, email, phone } = req.body;

  console.log("Received data:", { name, email, phone }); // Log incoming data

  if (!name || !email || !phone) {
    console.log("Validation failed: Missing fields."); // Log validation errors
    return res.status(400).json({
      success: false,
      message: "Name, email, and phone are required",
    });
  }

  const amount = 1000 * 100; // Example: 1000 INR (amount in paise)
  const options = {
    amount: amount, // amount in smallest currency unit (paise)
    currency: "INR",
    receipt: `receipt_order_${Math.random() * 10000}`, // unique receipt id
  };

  try {
    console.log("Creating Razorpay order with options:", options); // Log Razorpay order options

    // Create an order using Razorpay API
    const razorpayOrder = await razorpay.orders.create(options);

    console.log("Razorpay order created:", razorpayOrder); // Log the created order

    if (!razorpayOrder) {
      console.log("Razorpay order creation failed."); // Log Razorpay failure
      return res.status(500).json({
        success: false,
        message: "Razorpay order creation failed",
      });
    }

    // Save order details in the database
    const order = await Order.create({
      // <-- Ensure Order is imported correctly
      name,
      email,
      phone,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      status: "created",
    });

    console.log("Order saved to database:", order); // Log saved order details

    return res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error("Error occurred during order creation:", error); // Log error details
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
