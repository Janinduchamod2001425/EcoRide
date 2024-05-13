import express from 'express';
import {create,
        getAll, 
        getOne, 
        updatePackage, 
        deletePackage,
        downloadReport,
        getCount,
        getAllcus,
        getCusCount,
        downloadCusReport,
        deleteCusPackage,} from '../controller/packageController.js';

const route = express.Router();

route.post("/create", create);


route.get("/getall", getAll);
route.get("/getallcus", getAllcus);

route.get("/getone/:id", getOne);
route.put("/update/:id", updatePackage);
route.delete("/delete/:id", deletePackage);
route.delete("/cdelete/:cusid", deleteCusPackage);

route.get('/download', downloadReport);
route.get('/cusdownload', downloadCusReport);

route.get('/packages/count', getCount);
route.get('/cuspackages/count', getCusCount);





export default route;