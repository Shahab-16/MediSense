const mongoose = require("mongoose");


const MedicineSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    category:[{
        type:String,
        required:true,
        trim:true,
    }],
});


module.exports = mongoose.model("Medicines", MedicineSchema)