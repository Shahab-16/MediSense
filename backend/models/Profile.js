const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    phoneNumber:{
        type:Number,
        trim:true
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true }
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        default: "other"
    },
    height: {
        type: Number,
        trim: true
    },
    weight: {
        type: Number,
        trim: true
    },
    allergies: {
        type: String,
        trim: true
    },
    diseases: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model("Profile", ProfileSchema);