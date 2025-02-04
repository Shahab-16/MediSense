const mongoose=require('mongoose');

const medicalStoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }], // References to medicines
    deliveryAvailable: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });



module.exports=mongoose.model("MedicalStore",medicalStoreSchema);