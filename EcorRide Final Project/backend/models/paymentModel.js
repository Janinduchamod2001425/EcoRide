import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    cardtype: {
      type: String,
      required: true,
    },
    cardnumber: {
      type: String,
      required: true,
    },
    expiredate: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
