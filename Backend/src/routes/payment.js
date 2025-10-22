const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const User = require("../models/user");
const { membershipAmount } = require("../utils/constants");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

// CREATE ORDER
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { firstName, lastName, emailId, membershipType },
    });

    console.log("Order Created:", order.id);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ 
      ...savedPayment.toJSON(), 
      keyId: process.env.RAZORPAY_KEY_ID 
    });
  } catch (err) {
    console.error("❌ Payment Creation Error:", err);
    return res.status(500).json({ msg: err.message });
  }
});

// ADD THIS - PAYMENT VERIFICATION ENDPOINT
paymentRouter.post("/payment/verify", userAuth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log("✅ Payment verification request received");
    console.log("Order ID:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);

    const crypto = require('crypto');
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    console.log("Signature valid?", isValid);

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const payment = await Payment.findOne({ orderId: razorpay_order_id });
    
    if (payment) {
      payment.status = "paid";
      payment.paymentId = razorpay_payment_id;
      await payment.save();

      const user = await User.findById(payment.userId);
      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;
      await user.save();

      console.log("✅✅✅ USER IS NOW PREMIUM:", user.emailId);
    }

    res.json({ success: true, message: "Payment verified successfully" });
    
  } catch (err) {
    console.error("❌ Payment Verification Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});


// WEBHOOK (Your existing code)
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("Webhook Called");
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    
    if (payment) {
      payment.status = paymentDetails.status;
      await payment.save();

      const user = await User.findById(payment.userId);
      if (user) {
        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;
        await user.save();
      }
    }

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// VERIFY PREMIUM STATUS
paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  return res.json({ isPremium: user.isPremium || false, ...user });
});

module.exports = paymentRouter;
