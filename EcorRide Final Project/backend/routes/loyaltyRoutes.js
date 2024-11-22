import express from "express";
import {
  createLoyalty,
  getLoyaltyByCustomer,
} from "../controllers/loyaltyController.js";
import { checkCustomer, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/createloyalty").post(protect, checkCustomer, createLoyalty);
router.get("/getloyalty/:customerId", getLoyaltyByCustomer);

export default router;
