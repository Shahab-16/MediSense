const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  doctorId: { type: String, required: true },
  date: { type: String, required: true },       // Changed to string (YYYY-MM-DD)
  time: { type: String, required: true },       // Renamed from slotTime
  doctorName: { type: String, required: true }, // New field
  specialization: { type: String, required: true }, // New field
  fees: { type: Number, required: true },       // Renamed from amount
  profileImage: { type: String, required: true }, // New field
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending'
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending'
  },
}, { 
  timestamps: true, // Automatically adds createdAt and updatedAt
  versionKey: false // Disable the __v field
});

module.exports = mongoose.model("Appointment", AppointmentSchema);