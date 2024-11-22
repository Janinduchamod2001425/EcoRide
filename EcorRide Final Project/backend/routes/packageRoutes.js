import express from "express";
import {
  createPackage,
  getPackageByCustomer,
} from "../controllers/packageController.js";
import { protect, checkCustomer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/create").post(protect, checkCustomer, createPackage);
router.get("/getpackage/:customerId", getPackageByCustomer);

export default router;
