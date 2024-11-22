import express from 'express';
import { createloyalty, deleteLoyalty, getAllLoyalty, getOneLoyalty, updateLoyalty } from '../controller/loyaltyController.js';
 
const route = express.Router();

route.post("/createloyalty", createloyalty);
route.get("/getallloyalty", getAllLoyalty);
route.get("/getoneloyalty/:id", getOneLoyalty);
route.put("/updateloyalty/:id", updateLoyalty);
route.delete("/deleteloyalty/:id", deleteLoyalty);

export default route;