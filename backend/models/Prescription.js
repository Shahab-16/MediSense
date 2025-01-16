const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicines: [{
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      dosage: { type: String, required: true },
      duration: { type: String, required: true },
    }],
    dateIssued: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Prescription', prescriptionSchema);
  