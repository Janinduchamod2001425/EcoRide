import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    license: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("evehicle", vehicleSchema);

export default Vehicle;
