const express = require("express");
const cors = require("cors");
const mongooseMorgan = require("mongoose-morgan");
const db = require("./Models");
const app = express();
app.use(cors());
app.use(express.json());

app.use(mongooseMorgan({
    connectionString : db.url,
}));

db.mongoose 
  .connect(db.url,{
     useNewUrlParser:true,
     useUnifiedTopology: true
   })
  .then(()=>{
    console.log("db connected successfully")
  })
  .catch(err => {
    console.log("cannot connect",err);
   })
   require("./Routes/maintenance.route")(app)
   require("./Routes/spare.route")(app)

   app.get( "/" , (req , res)=>{
       res.json("Welcome to Maintenance  Management in EcoRide System")
       })
       const PORT=process.env.PORT || 2000
       app.listen(PORT , ()=>{
        console.log(`Server is running on ${PORT}`)
        });


