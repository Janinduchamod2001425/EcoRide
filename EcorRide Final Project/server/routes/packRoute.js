import express from "express";
import { createPack, deletePack, getAllPack, getOnePack, updatePack } from '../controller/packController.js'

const route = express.Router();

route.post("/createpack", createPack);
route.get("/getallpacks", getAllPack);
route.get("/getonepack/:id", getOnePack);
route.put("/updatepack/:id", updatePack);
route.delete("/deletepack/:id", deletePack);

export default route;