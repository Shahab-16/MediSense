const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        required: true,
        trim: true
    },
    specialization:{
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true }
    },
    experience: {
        type: Number,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String, 
        trim: true
    },
})


module.exports = mongoose.model("Doctors", DoctorSchema);