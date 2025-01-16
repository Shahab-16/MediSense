const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    specialization:{
        type: String,
        required: true,
        trim: true
    },
    currentPatients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }],
    pastPatients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }],
    experience: {
        type: Number,
        required: true,
        trim: true
    },
})


module.exports = mongoose.model("Doctors", DoctorSchema);