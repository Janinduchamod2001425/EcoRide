import mongoose from "mongoose";

// Create user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: true }); // Adding timestamps option

export default mongoose.model("User", userSchema);
