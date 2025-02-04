const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctors" }], // References to doctors
  facilities: [{ type: String }], // e.g., ICU, X-Ray, etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model("Hospitals",hospitalSchema);


