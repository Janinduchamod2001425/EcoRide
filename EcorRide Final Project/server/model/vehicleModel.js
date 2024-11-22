import mongoose from "mongoose";

// Create vehicle schema
const vehicleSchema = new mongoose.Schema({
  license: { type: String, required: true ,unique: true  },
  category: { type: String, required: true },
  model: { type: String, required: true },
  status: { type: String, required: true },
  price : { type: String, required: true },
});

export default mongoose.model("evehicle", vehicleSchema);
