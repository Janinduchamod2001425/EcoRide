import asyncHandler from "express-async-handler";
import Feedback from "../models/feedbackModel.js";

// @desc add new feedback
// route POST/api/feedback
// @access Public
const addFeedback = asyncHandler(async (req, res) => {
  const { age, gender, district, preferred_package, usage, suggestion, find, type, comment, rating } = req.body;

  const userId = req.user._id;
  const cusname = req.user.name;

  // Validate age
  if (!Number.isInteger(age) || age <= 0) {
    res.status(400);
    throw new Error("Age must be a positive integer");
  }

  // Validate required fields
  if (!age || !gender || !district || !preferred_package || !usage || !find || !type || !comment) {
    res.status(400);
    throw new Error("You missing required fields");
  }

  const feedback = await Feedback.create({
    age,
    gender,
    district,
    preferred_package,
    usage,
    suggestion,
    find,
    type,
    comment,
    rating,
    customerName: cusname,
    customer: userId,
  });

  if (feedback) {
    res.status(201).json({
      _id: feedback._id,
      age: feedback.age,
      gender: feedback.gender,
      district: feedback.district,
      preferred_package: feedback.preferred_package,
      usage: feedback.usage,
      suggestion: feedback.suggestion,
      find: feedback.find,
      type: feedback.type,
      comment: feedback.comment,
      rating: feedback.rating,
      customerName: feedback.customerName,
      customer: feedback.customer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid card Details");
  }
});

// Get feedback by customer Id
const getFeedbackByCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.customerId; 
  
  const feedback = await Feedback.find({ customer: customerId });

  if (feedback) {
    res.status(200).json(feedback);
  } else {
    res.status(404);
    throw new Error("Couldn't find Any Feedback");
  }
});

// @desc Get feedback
// route GET/api/feedbacks/feedback
// @access Private
const getUserFeedback = asyncHandler(async (req, res) => {

  const feedback = {
    _id: req.feedback._id,
    description: req.feedback.description,
    date: req.feedback.date,
    rating: req.feedback.rating,
  };

  res.status(200).json(feedback);
});

// @desc Update feedback
// route PUT/api/feedbacks/feedback
// @access Private
const updateUserFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.feedback._id);

  if (feedback) {
    feedback.description = req.body.description || feedback.description;
    feedback.date = req.body.date || feedback.date;
    feedback.rating = req.body.rating || feedback.rating;

    const updatedFeedback = await feedback.save();

    res.status(200).json({
      _id: updatedFeedback._id,
      description: updatedFeedback.description,
      date: updatedFeedback.date,
      rating: updatedFeedback.rating,
    });
  } else {
    res.status(404);
    throw new Error("Feedback not Found");
  }

  //res.status(200).json({ message : 'Update User Profile' });
});

// @desc Delete feedback
// @route DELETE /api/feedbacks/delete/:id
// @access Private/Admin
const deleteUserFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (feedback) {
    const id = req.params.id;
    const feedbackExists = await Feedback.findById(id);
    if (!feedbackExists) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("feedback not found");
  }
});



export { addFeedback, getFeedbackByCustomer, getUserFeedback, updateUserFeedback, deleteUserFeedback };
