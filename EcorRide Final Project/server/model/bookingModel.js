import mongoose from "mongoose";

// Create user schema
const bookingSchema = new mongoose.Schema(
  {
    vehicle: { type: String, required: true },
    category: { type: String, required: true },
    model: { type: String, required: true },
    reserve_date: { type: Date, required: true },
    duration: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
