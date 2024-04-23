// module.exports = (mongoose)=>{
//     const dbLink = require("../Config/db.config")
    

//     var schema = mongoose.schema({
//         id : String,
//         vin : String,
//         make : String,
//         model : String,
//         year: Number, 
//         mileAge : Number,
//         serviceDate :  Date,
//         nextService : Date,
//         licenceplate : String,
//         maintenanceStatus : Boolean,
//         ownersEmail : String
//     })

//     schema.method("toJSON", function() {
//         const{_id, ...object}= this.toObject()
//         object.id= _id
//         return object;
//       })

//       const Maintenance =  mongoose.model("Maintenance", schema, "Maintenance")
//       return Maintenance
// }

module.exports = (mongoose)=>{
    const dbLink = require("../Config/db.config")
    var schema = mongoose.Schema({
        id : Number,
        vin : String,
        make : String,
        model : String,
        year: Number, 
        mileage : Number,
        serviceDate :  Date,
        nextServiceDate : Date,
        licensePlate : String,
        maintenanceStatus : Boolean,
        ownersEmail : String
    })

    schema.method("toJSON", function() {
        const{_id, ...object}= this.toObject()
        object.id= _id
        return object;
      })

      const Maintenance =  mongoose.model("Maintenance", schema, "Maintenance")
      return Maintenance
}