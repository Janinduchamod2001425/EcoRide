import express from "express";
import {
  create,
  deleteBooking,
  getAll,
  getOne,
  updateBooking,
} from "../controller/bookingController.js";

const route = express.Router();

route.post("/createbooking", create);
route.get("/getallbookings", getAll);
route.get("/getonebooking/:id", getOne);
route.put("/updatebooking/:id", updateBooking);
route.delete("/deletebooking/:id", deleteBooking);

export default route;
