import asyncHandler from "express-async-handler";
import Maintenance from "../models/maintenanceModel.js";

// Validate Sri Lanka Vehicle License Plate Format
const validateLicensePlate = (licensePlate) => {
  const regex = /^[A-Z]{2}[A-Z]{3}\d{4}$/;
  return regex.test(licensePlate) && licensePlate.length === 9;
};

// @desc Create new Maintenance
// route POST/api/Maintenance
// @access Public
const createMaintenance = asyncHandler(async (req, res) => {
  const {
    vin,
    make,
    model,
    year,
    mileage,
    serviceDate,
    nextServiceDate,
    licensePlate,
    maintenanceStatus,
  } = req.body;

  // Validate required fields
  if (
    !vin ||
    !make ||
    !model ||
    !year ||
    !mileage ||
    !serviceDate ||
    !nextServiceDate ||
    !licensePlate ||
    !maintenanceStatus
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate ServiceDate (cannot be a past date)
  const Service_Date = new Date(serviceDate);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  if (Service_Date < todayDate) {
    res.status(400);
    throw new Error("Next Service date cannot be a past date");
  }

  // Validate nextServiceDate (cannot be a past date or today)
  const next_Service_Date = new Date(nextServiceDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (next_Service_Date <= today) {
    res.status(400);
    throw new Error("Next Service date cannot be a past date or today");
  }

  // Check if the license plate format is valid
  if (!validateLicensePlate(licensePlate)) {
    res.status(400);
    throw new Error("Invalid license plate format");
  }

  // Validate year (four digits)
  const yearRegex = /^\d{4}$/;
  if (!yearRegex.test(year)) {
    res.status(400);
    throw new Error("Year must be a four-digit number");
  }

  // Validate mileage (non-negative integer)
  const mileageRegex = /^\d+$/;
  if (!mileageRegex.test(mileage)) {
    res.status(400);
    throw new Error("Mileage must be a non-negative integer");
  }

  const maintenance = await Maintenance.create({
    vin,
    make,
    model,
    year,
    mileage,
    serviceDate,
    nextServiceDate,
    licensePlate,
    maintenanceStatus,
  });

  if (maintenance) {
    res.status(201).json({
      _id: maintenance._id,
      vin: maintenance.vin,
      make: maintenance.make,
      model: maintenance.model,
      year: maintenance.year,
      mileage: maintenance.mileage,
      serviceDate: maintenance.serviceDate,
      nextServiceDate: maintenance.nextServiceDate,
      licensePlate: maintenance.licensePlate,
      maintenanceStatus: maintenance.maintenanceStatus,
    });
  } else {
    res.status(400);
    throw new Error("Invalid card Details");
  }
});

export { createMaintenance };
