const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password:{type:String,required:true},
  profileImage: { type: String, trim: true },
  specialization: { type: String, required: true, trim: true },
  degree: [{ type: String, trim: true }],
  available:{type:Boolean,required:true},
  consultationFee: { type: Number, required: true },
  experience: { type: Number, required: true, trim: true },
  about:{type:String,required:true},
  address: { type: Object, required: true},
  date: { type: Date, required: true },
  slot_booked:{type:Object,default:{}},
  phone: { type: String, required: true, trim: true, unique: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospitals" },
  currentPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pastPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  languagesSpoken: {type:String,enum:["English","Hindi","Others"]},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctors", DoctorSchema);
