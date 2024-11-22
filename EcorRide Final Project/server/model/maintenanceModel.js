import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema({
  vin: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  serviceDate: {
    type: Date,
    required: true,
  },
  nextServiceDate: {
    type: Date,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  maintenanceStatus: {
    type: String,
    required: true,
  },
}, {
    timestamps: true,
});

const Maintenance = mongoose.model("EVehicle_Maintenance", maintenanceSchema);

export default Maintenance;