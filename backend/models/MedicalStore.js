const mongoose=require("mongoose");

const medicalStoreSchema = new mongoose.Schema({
  storeId: { type: String, unique: true },
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  password: { type: String, required: true },
  LicenseNumber: { type: String, required: true },
  pharmacyImage: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicines" }],
  deliveryAvailable: { type: Boolean, default: false },
  establishedYear: { type: Number, default: null },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  aboutPharmacy: { type: String, default: "" },
  acheivements: [{ type: String }],
  openHour: { type: String, default: "9:00 AM - 10:00 PM" },
}, { timestamps: true }); 

medicalStoreSchema.pre("save", async function (next) {
  if (!this.storeId) {
    this.storeId = `MS${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model("MedicalStore", medicalStoreSchema);
