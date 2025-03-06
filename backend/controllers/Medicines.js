const medicineStore=require('../models/MedicalStore');
const medicine=require('../models/Medicines');
const Medicine = require('../models/Medicines');
const MedicalStore = require('../models/MedicalStore');

// Add a new medicine to a pharmacy
exports.addMedicine = async (req, res) => {
    try {
        const { name, description, price, pharmacyId } = req.body;
        const medicine = new Medicine({ name, description, price, pharmacy: pharmacyId });
        await medicine.save();

        // Add the medicine to the pharmacy's medicines list
        await MedicalStore.findByIdAndUpdate(pharmacyId, { $push: { medicines: medicine._id } });

        res.status(201).json(medicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// List all medicines in a pharmacy
exports.listMedicines = async (req, res) => {
    try {
        const { pharmacyId } = req.params;
        const medicines = await Medicine.find({ pharmacy: pharmacyId }).populate('pharmacy');
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a medicine from a pharmacy
exports.deleteMedicine = async (req, res) => {
    try {
        const { medicineId } = req.params;
        const medicine = await Medicine.findByIdAndDelete(medicineId);

        // Remove the medicine from the pharmacy's medicines list
        await MedicalStore.findByIdAndUpdate(medicine.pharmacy, { $pull: { medicines: medicineId } });

        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};