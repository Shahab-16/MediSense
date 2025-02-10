const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  manufacturer: { type: String },
  medicalStoreId: { type: mongoose.Schema.Types.ObjectId, ref: "MedicalStore" },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  prescriptionRequired: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  category: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Medicines", MedicineSchema);
