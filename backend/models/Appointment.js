const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  doctorId:{type:String,required:true},
  slotDate:{type:String,required:true},
  slotTime:{type:String,required:true},
  userData:{type:Object,required:true},
  docData:{type:Object,required:true},
  amount:{type:Number,required:true},
  date:{type:Number,required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
