import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    vehicle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    reserve_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    payee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
