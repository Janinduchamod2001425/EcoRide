import express from "express";
import { createCusPack, deleteCusPack, getAllCusPack, getOneCusPack, updateCusPack } from '../controller/cuspackController.js'

const route = express.Router();

route.post("/createcuspack", createCusPack);
route.get("/getallcuspacks", getAllCusPack);
route.get("/getonecuspack/:id", getOneCusPack);
route.put("/updatecuspack/:id", updateCusPack);
route.delete("/deletecuspack/:id", deleteCusPack);

export default route;