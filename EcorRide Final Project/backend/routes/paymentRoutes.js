import express from "express";
import {
  createPayment,
  getPaymentByCustomer,
} from "../controllers/paymentController.js";
import { protect, checkCustomer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/create").post(protect, checkCustomer, createPayment);
router.get("/getpayment/:customerId", getPaymentByCustomer);

export default router;
