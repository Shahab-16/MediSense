const mongoose=require("mongoose");

const AppointmentSchema=new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    appointmentDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
});


module.exports=mongoose.model("Appointment",AppointmentSchema);