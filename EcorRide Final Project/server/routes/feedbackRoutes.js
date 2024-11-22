import express from 'express';
import { createFeedback, deleteFeedback, getAllFeedbacks, getOneFeedback, updateFeedback, getFeedbacksByCustomer } from '../controller/feedbackController.js';
 
const route = express.Router();

route.post("/createfeedback", createFeedback);
route.get("/getallfeedbacks", getAllFeedbacks);
route.get("/getonefeedback/:id", getOneFeedback);
route.put("/updatefeedback/:id", updateFeedback);
route.delete("/deletefeedback/:id", deleteFeedback);
route.get("/feedbacks/customer/:id", getFeedbacksByCustomer);

export default route;