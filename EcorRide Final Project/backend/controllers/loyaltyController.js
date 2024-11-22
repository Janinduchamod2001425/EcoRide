import asyncHandler from "express-async-handler";
import Loyalty from "../models/loyaltyModel.js";

// @desc Create new loyalty acc
// route POST/api/loyalty
// @access Public
const createLoyalty = asyncHandler(async (req, res) => {
  const { name, email, phone, birthdate, points } = req.body;

  const userId = req.user._id;

  // Validate required fields
  if (!name || !email || !phone || !birthdate) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate name
  const nameRegex = /^[a-zA-Z ]+$/;
  if (!nameRegex.test(name)) {
    res.status(400);
    throw new Error("Name can contain letters only");
  }

  // Validate email format
  const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailAddress.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  // Validate contact
  if (phone.length !== 10) {
    res.status(400);
    throw new Error("Contact number must be 10 characters long");
  }

  const loyalty = await Loyalty.create({
    name,
    email,
    phone,
    birthdate,
    points,
    customer: userId,
  });

  if (loyalty) {
    res.status(201).json({
      _id: loyalty._id,
      name: loyalty.name,
      email: loyalty.email,
      phone: loyalty.phone,
      birthdate: loyalty.birthdate,
      points: loyalty.points,
      customer: loyalty.customer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Loyalty Details");
  }
});

// Get Payment by customer Id
const getLoyaltyByCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.customerId; 

  const loyalty = await Loyalty.find({ customer: customerId });

  if (loyalty) {
    res.status(200).json(loyalty);
  } else {
    res.status(404);
    throw new Error("Couldn't find Loyalty Program");
  }
});

export { createLoyalty, getLoyaltyByCustomer };
