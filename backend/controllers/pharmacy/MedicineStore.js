const MedicalStore = require("../../models/MedicalStore");
const Medicine = require("../../models/Medicines");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

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

    // Extract the pharmacy name from the URL and replace hyphens with spaces
    const pharmacyName = req.params.pharmacyName.replace(/-/g, " ");

    if (!name || !price || !manufacturerBrand || !pharmacyName) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    console.log("Entered in add medicine and lets see the req.file:", req.file);

    let medicineImage =
      "https://cdn.pixabay.com/photo/2014/03/25/16/59/medicine-297778_1280.png";

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "MEDISENSE/Medicines_Images"
        });
        medicineImage = result.secure_url;
        console.log("medicineImage:", medicineImage);
      }
      catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: err.message,
        });
      }

      fs.unlinkSync(req.file.path);
    }

    // Find the MedicalStore by name
    const existingStore = await MedicalStore.findOne({ name: pharmacyName });
    if (!existingStore) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    // Check if the medicine already exists in the store
    let existingMedicine = await Medicine.findOne({
      name,
      medicalStoreId: existingStore._id,
    });

    if (existingMedicine) {
      existingMedicine.stock += stock || 1;
      await existingMedicine.save();

      return res.status(200).json({
        message: "Medicine stock updated successfully",
        medicine: existingMedicine,
      });
    }

    // Create a new medicine
    const medicine = new Medicine({
      name,
      price,
      manufacturerBrand,
      medicalStoreId: existingStore._id, // Use the ID of the found MedicalStore
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

    // Update the MedicalStore's medicines array
    await MedicalStore.findByIdAndUpdate(existingStore._id, {
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
    const { medicineId } = req.params;
    const pharmacyName = req.params.pharmacyName.replace(/-/g, " ");

    const medicineStore = await MedicalStore.findOne({ name: pharmacyName });

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
    res.status(500).json({
      message: "Failed at first try and in deleting medicine",
      error: err.message,
    });
  }
};

// List All Medicines in a Store
exports.listAllMedicines = async (req, res) => {
  try {
    const pharmacyName = req.params.pharmacyName.replace(/-/g, " ");
    const store = await MedicalStore.findOne({ name: pharmacyName }).populate(
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


exports.getAllMedicinesFromAllStores = async (req, res) => {
  try {
    const allMedicines = await Medicine.find({});
    if (!allMedicines) {
      return res.status(400).json({
        success: false,
        message: "Medicines list is empty"
      })
    }
    return res.status(200).json({
      success: true,
      data: allMedicines
    })
  }
  catch (err) {
    console.log("error in getting all medicines", err);
    return res.status(404).json({
      success: false,
      message: "Error in finding the medicines from all medicine stores"
    })
  }
};

exports.getAllMedicalStores = async (req, res) => {
  try {
    const allMedicals = await MedicalStore.find();
    if (!allMedicals) {
      return res.status(404).json({
        succes: false,
        message: "can not find all medicals"
      })
    }
    return res.status(200).json({
      success: true,
      data: allMedicals
    })
  } catch (error) {
    console.log("error in finding all medicals in pharmacy controller", error);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}
exports.getStoreByName=async(req,res)=>{
  try{
    const storeName=req.params.name;
    const medicinestore=await MedicalStore.findOne({name:storeName});
    if(!medicinestore){
      return res.json({sucess:false,message:"store not found"});
    }
    else{
      return res.json({success:true,data:medicinestore});
    }
  } catch(error){
    console.log("error in finding store by name in backend",error);
    return res.json({sucess:false,message:error.message});
  }
}