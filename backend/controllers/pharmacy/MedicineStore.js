const MedicalStore = require("../../models/MedicalStore");
const Medicine = require("../../models/Medicines");
const cloudinary = require("cloudinary").v2;

exports.addMedicine = async (req, res) => {
  try {
    const {
      name,
      price,
      manufacturerBrand,
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

    const { medicalStoreId } = req.params;

    if (!name || !price || !manufacturerBrand || !medicalStoreId) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    let medicineImage =
      "https://cdn.pixabay.com/photo/2014/03/25/16/59/medicine-297778_1280.png";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      medicineImage = result.secure_url;
    }

    const existingStore = await MedicalStore.findById(medicalStoreId);
    if (!existingStore) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    let existingMedicine = await Medicine.findOne({ name, medicalStoreId });

    if (existingMedicine) {
      existingMedicine.stock += stock || 1;
      await existingMedicine.save();

      return res.status(200).json({
        message: "Medicine stock updated successfully",
        medicine: existingMedicine,
      });
    }

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
      medicineImage,
    });

    await medicine.save();

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
    const { pharmacyId, medicineId } = req.params;

    const medicineStore = await MedicalStore.findById(pharmacyId);

    if (!medicineStore) {
      return res.status(404).json({ message: "Medical Store not found" });
    }
    let medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    await Medicine.findByIdAndDelete(medicineId);
    await MedicalStore.updateOne(
      { _id: medicine.medicalStoreId },
      { $pull: { medicines: medicineId } }
    );

    return res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed at first try and in deleting medicine",
        error: err.message,
      });
  }
};

// List All Medicines in a Store
exports.listAllMedicines = async (req, res) => {
  try {
    const { medicineStoreId } = req.body;
    const store = await MedicalStore.findById(medicineStoreId).populate(
      "medicines"
    );
    if (!store) {
      return res.status(404).json({ message: "Medical store not found" });
    }

    res.status(200).json({ medicines: store.medicines });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
