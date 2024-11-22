import express from "express";
import { createMaintenance } from "../controllers/maintenanceController.js";
import { protect, checkAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/createmaintenance").post(protect, checkAdmin, createMaintenance);

export default router;