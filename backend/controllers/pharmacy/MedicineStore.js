const MedicalStore = require("../../models/MedicalStore");
const Medicine = require("../../models/Medicines");
const cloudinary=require("cloudinary").v2;

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

    const {medicalStoreId}=req.params;

    // ✅ First, validate required fields
    if (!name || !price || !manufacturerBrand || !medicalStoreId) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    let medicineImage="https://cdn.pixabay.com/photo/2014/03/25/16/59/medicine-297778_1280.png";

    if(req.file){
      const result=await cloudinary.uploader.upload(req.file.path);
      medicineImage=result.secure_url;
    }

    // ✅ Check if the medical store exists
    const existingStore = await MedicalStore.findById(medicalStoreId);
    if (!existingStore) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    // ✅ Check if the medicine already exists in this store
    let existingMedicine = await Medicine.findOne({ name, medicalStoreId });

    if (existingMedicine) {
      // ✅ Medicine exists, so increase stock
      existingMedicine.stock += stock || 1;
      await existingMedicine.save();

      return res.status(200).json({
        message: "Medicine stock updated successfully",
        medicine: existingMedicine,
      });
    }

    // ✅ Create new medicine
    const medicine = new Medicine({
      name,
      price,
      manufacturerBrand,
      medicalStoreId,
      description,
      prescriptionRequired,
      stock: stock || 1,  // Default stock to 1
      image,
      category,
      expiryDate,
      dosageForm,
      strength,
      usageInstructions,
      sideEffects,
      storageInstructions,
      discount,
      medicineImage
    });

    // ✅ Save the new medicine
    await medicine.save();

    // ✅ Add the new medicine's ID to the medical store's medicines list
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
    const {pharmacyId,medicineId}=req.params;

    let medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (medicine.stock > quantity) {
      // ✅ Reduce stock if quantity is available
      medicine.stock -= quantity;
      await medicine.save();
      return res.status(200).json({ message: "Stock reduced successfully", medicine });
    } else {
      // ✅ Delete Medicine from Database
      await Medicine.findByIdAndDelete(medicineId);

      // ✅ Remove Medicine from Medical Store
      await MedicalStore.updateOne(
        { _id: medicine.medicalStoreId },
        { $pull: { medicines: medicineId } }
      );

      // ✅ Delete the Medicine Image from Cloudinary (if it's not the default image)
      if (medicine.image && !medicine.image.includes("pixabay.com")) {
        // Extract Cloudinary public_id from URL
        const publicId = medicine.image.split("/").pop().split(".")[0]; // Extract ID from URL
        await cloudinary.uploader.destroy(`MEDISENSE/Medicine_Images/${publicId}`);
      }

      return res.status(200).json({ message: "Medicine removed as stock reached zero" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// List All Medicines in a Store
exports.listAllMedicines = async (req, res) => {
  try {
    const { medicineStoreId } = req.body;
    const store = await MedicalStore.findById(medicineStoreId).populate("medicines");
    if (!store) {
      return res.status(404).json({ message: "Medical store not found" });
    }

    res.status(200).json({ medicines: store.medicines });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
