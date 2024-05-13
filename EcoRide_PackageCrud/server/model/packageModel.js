import mongoose from 'mongoose';

// Create package schema
const packageSchema = new mongoose.Schema({
    packname:{ type: String, required: true},
    description:{ type: String, required: true},
    vehicletype:{ type: String, required: true},
    duration:{ type: String, required: true},
    price:{ type:String, required: true},
    


},{
    timestamps: true,
})

export default mongoose.model("Package", packageSchema);