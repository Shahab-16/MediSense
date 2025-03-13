const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalId: { type: String, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  hospitalImage: { type: String, required: true },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctors" }],
  facilities: [{ type: String }],
  emergencyFacility: { type: Boolean, default: false },
  emergencyContact: { type: String, default: "911-222-3333" },
  ambulance: { type: Number, required: true, default: 0 },
  beds: { type: Number, required: true, default: 0 },
  icuBeds: { type: Number, default: 0 },
  establishedYear: { type: Number, default: null },
  departments: [{ type: String }],  // ✅ Fixed spelling
  type: { type: String, enum: ["Government", "Private", "Charitable"], required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  aboutHospital: { type: String, default: "" },
  achievements: [{ type: String }],  // ✅ Fixed spelling
  advancedFacilities: [{ type: String, default: "" }],
  visitingHours: { type: String, default: "9:00 AM - 8:00 PM" },
  maxConsultancyTime: { type: Number, default: 30 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

hospitalSchema.pre("save", async function (next) {
  if (!this.hospitalId) {
    this.hospitalId = `HS${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model("Hospitals", hospitalSchema);
