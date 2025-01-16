const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicines: [{
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      quantity: { type: Number, required: true },
    }],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['ordered', 'shipped', 'delivered', 'cancelled'], default: 'ordered' },
  });
  
  module.exports = mongoose.model('Order', orderSchema);
  