import asyncHandler from "express-async-handler";
import Payment from "../models/paymentModel.js";

// @desc Create new reservation
// route POST/api/reservation
// @access Public
const createPayment = asyncHandler(async (req, res) => {
  const { cardtype, cardnumber, expiredate, cvv } = req.body;

  const userId = req.user._id;

  // Validate required fields
  if (!cardtype || !cardnumber || !expiredate || !cvv) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate card number length
  if (cardnumber.length !== 16) {
    res.status(400);
    throw new Error("Card number should be 16 characters long");
  }

  // Validate CVV length
  if (cvv.length !== 3) {
    res.status(400);
    throw new Error("CVV should be 3 characters long");
  }

  const payment = await Payment.create({
    cardtype,
    cardnumber,
    expiredate,
    cvv,
    customer: userId,
  });

  if (payment) {
    res.status(201).json({
      _id: payment._id,
      cardtype: payment.cardtype,
      cardnumber: payment.cardnumber,
      expiredate: payment.expiredate,
      cvv: payment.cvv,
      customer: payment.customer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid card Details");
  }
});

// Get Payment by customer Id
const getPaymentByCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.customerId; // Get customer ID from request parameters

  // Find the License with the specified driver
  const payment = await Payment.find({ customer: customerId });

  if (payment) {
    res.status(200).json(payment);
  } else {
    res.status(404);
    throw new Error("Couldn't find Payment");
  }
});

export { createPayment, getPaymentByCustomer };
