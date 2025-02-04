const mongoose=require('mongoose');


const patientReportSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    reportDate: { type: Date, required: true },
    reportType: { type: String, required: true }, // e.g., Blood Test, X-Ray, etc.
    reportFile: { type: String }, // URL or file path to the report
    diagnosis: { type: String }, // Diagnosis from the doctor
    predictedDiseases: [{ type: String }], // Predicted diseases using AI/ML
    recommendedDiet: [{ type: String }], // Recommended diet
    recommendedMedicines: [{ type: String }], // Recommended medicines
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });



module.exports=mongoose.model("PatientReport",patientReportSchema);