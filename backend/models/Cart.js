const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicines: [{
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      quantity: { type: Number, required: true },
    }],
  });
  
  module.exports = mongoose.model('Cart', cartSchema);
  