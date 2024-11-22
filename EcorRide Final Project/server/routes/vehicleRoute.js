import express from 'express';
import { create, getAll, getOne, updateVehicle, deleteVehicle } from '../controller/vehicleController.js';
 
const route = express.Router();

route.post("/createvehicle", create);
route.get("/getallvehicle", getAll);
route.get("/getonevehicle/:id", getOne);
route.put("/updatevehicle/:id", updateVehicle);
route.delete("/deletevehicle/:id", deleteVehicle);

export default route;