const Pharmacy = require("../../models/MedicalStore");
const cloudinary = require("cloudinary").v2;

exports.addMedicineStore = async (req, res) => {
  try {
    const {
      name,
      ownerName,
      LicenseNumber,
      address,
      contact,
      email,
      medicines,
      deliveryAvailable,
      establishedYear,
      status,
      aboutPharmacy,
      acheivements,
      openHour,
    } = req.body;

    let pharmacyStoreImage =
      "https://static.vecteezy.com/system/resources/previews/002/172/389/large_2x/pharmacy-store-front-on-city-background-commercial-property-medicine-building-illustration-in-flat-style-vector.jpg";

    if (
      !name ||
      !ownerName ||
      !LicenseNumber ||
      !address ||
      !contact ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const existingPharmacy = await Pharmacy.findOne({ email });

    if (existingPharmacy) {
      return res.status(400).json({
        success: false,
        message: "Pharmacy already exists",
      });
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "MEDISENSE/Pharmacy_Images",
        });
        pharmacyStoreImage = result.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: error.message,
        });
      }
    }

    const newPharmacy = new Pharmacy({
      name,
      ownerName,
      LicenseNumber,
      address,
      contact,
      email,
      medicines: medicines || [],
      deliveryAvailable: deliveryAvailable || false,
      establishedYear: establishedYear || null,
      status: status || "open",
      aboutPharmacy: aboutPharmacy || "",
      acheivements: acheivements || [],
      openHour: openHour || "9:00 AM - 10:00 PM",
      pharmacyImage: pharmacyStoreImage,
    });

    await newPharmacy.save();

    return res.status(200).json({
      success: true,
      message: "Pharmacy added successfully",
      data: newPharmacy,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in adding pharmacy",
      error: err.message,
    });
  }
};

exports.removeMedicineStore = async (req, res) => {
  try {
    const { id } = req.body;
    const existMedicineStore = await Pharmacy.findById(id);

    if (!existMedicineStore) {
      return res.status(404).json({
        success: false,
        message: "No Medical Store found with this ID",
      });
    }

    const imageUrl = existMedicineStore.pharmacyImage;

    // Delete store from DB
    await Pharmacy.findByIdAndDelete(id);

    // Delete image from Cloudinary if it's not the default one
    if (imageUrl && !imageUrl.includes("vecteezy.com")) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(
        `MEDISENSE/Pharmacy_Images/${publicId}`
      );
    }

    return res.status(200).json({
      success: true,
      message: "Pharmacy removed successfully",
    });
  } catch (err) {
    console.error("Error in removing pharmacy:", err);
    return res.status(500).json({
      success: false,
      message: "Error in removing pharmacy",
      error: err.message,
    });
  }
};

exports.listAllMedicineStores = async (req, res) => {
  try {
    const pharmaciesList = await Pharmacy.find({});
    if (!pharmaciesList || pharmaciesList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pharmacies found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pharmacies list",
      pharmaciesList,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in listing pharmacies",
      error: err.message,
    });
  }
};
