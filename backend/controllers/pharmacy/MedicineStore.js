const MedicalStore = require("../../models/MedicalStore");
const Medicine = require("../../models/Medicines");

// Add Medicine
exports.addMedicine = async (req, res) => {
  try {
    const {
      name,
      price,
      manufacturerBrand,
      medicalStoreId,
      description,
      prescriptionRequired,
      stock,
      image,
      category,
      expiryDate,
      dosageForm,
      strength,
      usageInstructions,
      sideEffects,
      storageInstructions,
      discount,
    } = req.body;

    // Check if the medicine already exists in the store
    const existingMedicine = await Medicine.findOne({ name, medicalStoreId });

    if (existingMedicine) {
      // If medicine exists, increase stock
      existingMedicine.stock += stock || 1;
      await existingMedicine.save();

      return res.status(200).json({
        message: "Medicine stock updated successfully",
        medicine: existingMedicine,
      });
    }

    // Create new medicine
    const medicine = new Medicine({
      name,
      price,
      manufacturerBrand,
      medicalStoreId,
      description,
      prescriptionRequired,
      stock: stock || 1,
      image,
      category,
      expiryDate,
      dosageForm,
      strength,
      usageInstructions,
      sideEffects,
      storageInstructions,
      discount,
    });

    // Save the new medicine
    await medicine.save();

    // Add the medicine to the pharmacy's medicines list
    await MedicalStore.findByIdAndUpdate(medicalStoreId, {
      $push: { medicines: medicine._id },
    });

    res.status(201).json({ message: "Medicine added successfully", medicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Medicine
exports.deleteMedicine = async (req, res) => {
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

// List All Medicines in a Store
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
