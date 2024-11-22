import asyncHandler from "express-async-handler";
import Package from "../models/packageModel.js";

const createPackage = asyncHandler(async (req, res) => {
  const { description, require_date, category, features, vehicletype, model, services, color, duration, totalPrice } = req.body;

  const userId = req.user._id;
  const cusname = req.user.name;

  if (
    !description ||
    !require_date ||
    !category ||
    !features ||
    !vehicletype ||
    !model ||
    !services ||
    !color ||
    !duration ||
    !totalPrice 
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const packageExists = await Package.countDocuments({ vehicletype });
  const packageExists2 = await Package.countDocuments({ require_date });

  if (packageExists >= 20 || packageExists2 >= 10) {
    res.status(400);
    throw new Error("Package already exists");
  }

  const pack = await Package.create({
    description,
    require_date,
    category,
    features,
    vehicletype,
    model, 
    services,
    color,
    duration,
    totalPrice,
    customerName: cusname,
    customer: userId,
  });

  if (pack) {
    res.status(201).json({
      _id: pack._id,
      description: pack.description,
      require_date: pack.require_date,
      category: pack.category,
      features: pack.features,
      vehicletype: pack.vehicletype,
      model: pack.model,
      services: pack.services,
      color: pack.color,
      duration: pack.duration,
      totalPrice: pack.totalPrice,
      customerName: pack.customerName,
      customer: pack.customer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Package data");
  }
});

// Get Package by customer Id
const getPackageByCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.customerId;

  // Find the License with the specified customer
  const pack = await Package.find({ customer: customerId });

  if (pack) {
    res.status(200).json(pack);
  } else {
    res.status(404);
    throw new Error("Couldn't find Payment");
  }
});

export { createPackage, getPackageByCustomer };
