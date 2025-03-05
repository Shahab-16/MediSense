const MedicalStore = require("../models/MedicalStore");
const Medicine = require("../models/Medicines");

exports.addMedicine = async (req, res) => {
    try {
        const { name, price, category, image, description, prescriptionRequired, stock, manufacturer, medicalStoreId } = req.body;

        const store = await MedicalStore.findById(medicalStoreId);
        if (!store) {
            return res.status(404).json({ message: "Medical store not found" });
        }

        let existingMedicine = await Medicine.findOne({ name, medicalStoreId });
        if (existingMedicine) {
            existingMedicine.stock += stock;
            await existingMedicine.save();
            return res.status(200).json({ message: "Stock updated successfully", medicine: existingMedicine });
        }

        const newMedicine = new Medicine({
            name,
            price,
            category,
            image,
            description,
            prescriptionRequired,
            stock,
            manufacturer,
            medicalStoreId
        });

        await newMedicine.save();
        store.medicines.push(newMedicine._id);
        await store.save();

        res.status(201).json({ message: "Medicine added successfully", medicine: newMedicine });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.removeMedicine = async (req, res) => {
    try {
        const { medicineId, quantity } = req.body;

        let medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        if (medicine.stock > quantity) {
            medicine.stock -= quantity;
            await medicine.save();
            return res.status(200).json({ message: "Stock reduced successfully", medicine });
        } else {
            await Medicine.findByIdAndDelete(medicineId);
            await MedicalStore.updateOne(
                { _id: medicine.medicalStoreId },
                { $pull: { medicines: medicineId } }
            );
            return res.status(200).json({ message: "Medicine removed as stock reached zero" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.listAllMedicines = async (req, res) => {
    try {
        const { medicalStoreId } = req.params;
        const store = await MedicalStore.findById(medicalStoreId).populate("medicines");
        if (!store) {
            return res.status(404).json({ message: "Medical store not found" });
        }

        res.status(200).json({ medicines: store.medicines });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
