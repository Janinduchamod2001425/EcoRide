import express from "express";
import {
  addBookig,
  getBookingByUser,
  getBookingDetails,
  updateBookingDetails,
  deleteBookingDetails,
} from "../controllers/bookingController.js";
import { protect, checkCustomer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/addbooking").post(protect, checkCustomer, addBookig);
router.get("/getbooking/:cusId", getBookingByUser);
router.route("/booking").get(getBookingDetails).put(updateBookingDetails);
router.delete("/delete/:id", deleteBookingDetails);

export default router;
