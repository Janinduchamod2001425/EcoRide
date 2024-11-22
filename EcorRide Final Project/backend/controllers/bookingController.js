import asyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";

// @desc Create new booking
// route POST/api/bookings
// @access Public
const addBookig = asyncHandler(async (req, res) => {
  const { vehicle, category, model, reserve_date, duration, total_price } =
    req.body;

  const userId = req.user._id;

  // Check if the user ID is valid
  if (!userId) {
    res.status(401);
    throw new Error("User not authorized or user ID missing");
  }

  // Validate required fields
  if (
    !vehicle ||
    !category ||
    !model ||
    !reserve_date ||
    !duration ||
    !total_price
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate duration
  if (duration >= 10) {
    res.status(400);
    throw new Error("You cannot exceed 10 days");
  }

  // Validate reserve_date (cannot be a past date)
  const reservationDate = new Date(reserve_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  if (reservationDate < today) {
    res.status(400);
    throw new Error("Reservation date cannot be a past date");
  }

  const booking = await Booking.create({
    vehicle,
    category,
    model,
    reserve_date,
    duration,
    total_price,
    payee: userId,
  });

  if (booking) {
    res.status(201).json({
      _id: booking._id,
      vehicle: booking.vehicle,
      category: booking.category,
      model: booking.model,
      reserve_date: booking.reserve_date,
      duration: booking.duration,
      total_price: booking.total_price,
      payee: booking.payee,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Booking Details");
  }
});

// Get booking by user id
const getBookingByUser = asyncHandler(async (req, res) => {
  const cusId = req.params.cusId;

  const booking = await Booking.find({
    payee: cusId,
  });

  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404);
    throw new Error("Couldn't find Booking Details");
  }
});

// @desc Get Reservation Details
// route GET/api/bookings/booking
// @access Private
const getBookingDetails = asyncHandler(async (req, res) => {
  const booking = {
    _id: booking._id,
    vehicle: booking.vehicle,
    category: booking.category,
    model: booking.model,
    reserve_date: booking.reserve_date,
    duration: booking.duration,
    total_price: booking.total_price,
  };

  res.status(200).json(booking);
});

// @desc Update booking details
// route PUT/api/bookings/booking
// @access Private
const updateBookingDetails = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.booking._id);

  if (booking) {
    booking.vehicle = req.body.vehicle || booking.vehicle;
    booking.category = req.body.category || booking.category;
    booking.model = req.body.model || booking.model;
    booking.reserve_date = req.body.reserve_date || booking.reserve_date.toDate;
    booking.duration = req.body.duration || booking.duration;
    booking.total_price = req.body.total_price || booking.total_price;

    const updatedBooking = await booking.save();

    res.status(200).json({
      _id: updatedBooking._id,
      vehicle: updatedBooking.vehicle,
      category: updatedBooking.category,
      model: updatedBooking.model,
      reserve_date: updatedBooking.reserve_date,
      duration: updatedBooking.duration,
      total_price: updatedBooking.total_price,
    });
  } else {
    res.status(404);
    throw new Error("Booking not Found");
  }
});

// @desc Delete Booking
// @route DELETE /api/bookings/delete/:id
// @access Private/Admin
const deleteBookingDetails = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    const id = req.params.id;
    const bookingExists = await Booking.findById(id);
    if (!bookingExists) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

export {
  addBookig,
  getBookingByUser,
  getBookingDetails,
  updateBookingDetails,
  deleteBookingDetails,
};
