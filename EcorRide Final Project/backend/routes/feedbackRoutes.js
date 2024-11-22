import express from "express";
import {
  addFeedback,
  getFeedbackByCustomer,
  getUserFeedback,
  updateUserFeedback,
  deleteUserFeedback,
} from "../controllers/feedbackController.js";
import { protect, checkCustomer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/addfeedback").post(protect, checkCustomer, addFeedback);
router.get("/getfeedback/:customerId", getFeedbackByCustomer);
router
  .route("/feedback")
  .get(protect, getUserFeedback)
  .put(protect, updateUserFeedback);
router.delete("/delete/:id", deleteUserFeedback);

export default router;
