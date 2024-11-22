import mongoose from "mongoose";

// Create package schema
const cuspackageSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    require_date: { type: Date, required: true },
    category: { type: String, required: true },
    features: {
      type: String,
      required: true,
    },
    vehicletype: { type: String, required: true },
    model: { type: String, required: true },
    services: { type: String, required: true },
    color: { type: String, required: true },
    duration: { type: String, required: true },
    totalPrice: { type: String, required: true },
    customerName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("cuspackage", cuspackageSchema);
