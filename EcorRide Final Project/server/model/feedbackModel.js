import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  preferred_package: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
  find: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

export default mongoose.model("Feedback", feedbackSchema);
