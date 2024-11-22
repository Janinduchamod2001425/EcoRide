import express from "express";
import { createMaintenance, getAllmaintenance, getOneMaintenance, updateMaintenance, deleteMaintenance } from '../controller/maintenanceController.js';

const route = express.Router();

route.post("/createmaintenance", createMaintenance);
route.get("/getallmaintenance", getAllmaintenance);
route.get("/getonemaintenance/:id", getOneMaintenance);
route.put("/updatemaintenance/:id", updateMaintenance);
route.delete("/deletemaintenance/:id", deleteMaintenance);

export default route;