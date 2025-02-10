const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicines: [
    {
      medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicines",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  medicalStoreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalStore",
    required: true,
  }, // Reference to Medical Store
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "dispatched", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
