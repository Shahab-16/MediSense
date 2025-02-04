const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  currentPatients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  pastPatients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  experience: {
    type: Number,
    required: true,
    trim: true,
  },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  
  consultationFee: { type: Number },

  availability: [{ // Doctor's availability
    day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    startTime: { type: String },
    endTime: { type: String },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Doctors", DoctorSchema);
