import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/userRoute.js';
import vehicleroute from './routes/vehicleRoute.js';
import bookingroute from './routes/bookingRoutes.js';
import packroute from './routes/packRoute.js';
import cuspackroute from './routes/cuspackRoute.js';
import feedbackroute from './routes/feedbackRoutes.js';
import maintenanceroute from './routes/maintenanceRoute.js';
import loyaltyroute from './routes/loyaltyRoute.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("DB connected 🍃");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log(error));

app.use("/api", route);
app.use("/api", bookingroute);
app.use("/api", vehicleroute);
app.use("/api", packroute);
app.use("/api", cuspackroute);
app.use("/api", feedbackroute);
app.use("/api", maintenanceroute);
app.use("/api", loyaltyroute);