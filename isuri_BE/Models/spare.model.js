module.exports = (mongoose)=>{
    const dbLink = require("../Config/db.config")
    var schema = mongoose.Schema({
        id : Number,
        name : String,
        price : Number,
        stock : Number,
        discount: Number, 
        available : Boolean
    })

    schema.method("toJSON", function() {
        const{_id, ...object}= this.toObject()
        object.id= _id
        return object;
      })

      const Spare =  mongoose.model("Spare", schema, "Spare")
      return Spare
}