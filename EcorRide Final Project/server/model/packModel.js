import mongoose from "mongoose";

const packSchema = new mongoose.Schema(
  {
    packname: { type: String, required: true },
    description: { type: String, required: true },
    vehicletype: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Package", packSchema);
