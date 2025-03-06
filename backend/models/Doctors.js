const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialization: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  phone: { type: String, required: true, trim: true, unique: true }, // New Field
  profileImage: { type: String, trim: true }, // New Field
  education: [{ type: String, trim: true }], // New Field
  experience: { type: Number, required: true, trim: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  consultationFee: { type: Number, required: true },
  availability: [
    {
      day: { type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
      startTime: { type: String },
      endTime: { type: String },
    },
  ],
  currentPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pastPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  ratings: { type: Number, default: 0 }, // New Field
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reviewText: { type: String, trim: true },
      rating: { type: Number, min: 1, max: 5 },
      date: { type: Date, default: Date.now },
    },
  ],
  languagesSpoken: {type:String,enum:["English","Hindi","Others"]},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctors", DoctorSchema);
