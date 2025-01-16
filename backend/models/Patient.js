const mongoose=require("mongoose");


const PatientSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedDoctors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctors",
    }],
    medicalHistory:[{
        type:String,
    }],
    currentMedications:[{
        type:String,
    }],
    pastMedications:[{
        type:String,
    }],
    allergies:[{
        type:String,
    }],
});


module.exports=mongoose.model("Patient",PatientSchema);