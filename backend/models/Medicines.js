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
  manufacturerBrand: { type: String, required: true },
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
  expiryDate: { type: Date, required: true },
  dosageForm: {
    type: String,
    enum: ["Tablet", "Capsule", "Syrup", "Injection", "Ointment", "Drops"],
    required: true,
  },
  strength: { type: String, required: true, trim: true },
  usageInstructions: {
    type: String,
    default: "Refer to packaging or consult a doctor",
  },
  sideEffects: [{ type: String }],
  storageInstructions: {
    type: String,
    default: "Store in a cool, dry place away from sunlight",
  },
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Medicines", MedicineSchema);
