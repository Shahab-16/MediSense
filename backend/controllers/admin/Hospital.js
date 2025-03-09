const Hospital = require("../../models/Hospitals");
const cloudinary = require("cloudinary").v2;

exports.addHospital = async (req, res) => {
  try {
    const {
      name,
      address,
      contact,
      email,
      doctors,
      facilities,
      ambulance,
      beds,
      establishedYear,
      departments,
      type,
      status,
      aboutHospital,
      achievements,
      emergencyFacility,
      emergencyContact,
      icuBeds,
      advancedFacilities,
      visitingHours,
      maxConsultancyTime,
    } = req.body;

    if (
      !name ||
      !address ||
      !contact ||
      !email ||
      ambulance === undefined ||
      beds === undefined ||
      !type
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check if the hospital already exists
    const existingHospital = await Hospital.findOne({ email });

    if (existingHospital) {
      return res.status(400).json({
        success: false,
        message: "Hospital already exists",
      });
    }

    let hospitalImage =
      "https://static.vecteezy.com/system/resources/previews/011/098/092/original/hospital-clinic-building-3d-icon-illustration-png.png";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MEDISENSE/Hospital_Images",
      });
      hospitalImage = result.secure_url;
    }

    // Create a new hospital instance
    const newHospital = new Hospital({
      name,
      address,
      contact,
      email,
      doctors: doctors || [],
      facilities: facilities || [],
      ambulance,
      beds,
      establishedYear: establishedYear || null,
      departments: departments || [],
      type,
      achievements: achievements || [],
      status: status || "open",
      aboutHospital: aboutHospital || "",
      emergencyFacility: emergencyFacility || false,
      emergencyContact: emergencyContact || "911-222-3333",
      icuBeds: icuBeds || 0,
      advancedFacilities: advancedFacilities || [],
      visitingHours: visitingHours || "9:00 AM - 8:00 PM",
      maxConsultancyTime: maxConsultancyTime || 30,
      hospitalImage,
    });

    // Save the new hospital to the database
    await newHospital.save();

    return res.status(200).json({
      success: true,
      message: "Hospital added successfully",
      data: newHospital,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in adding hospital",
      error: err.message,
    });
  }
};

exports.listHospitals = async (req, res) => {
  try {
    const hospitalsList = await Hospital.find({});
    if (!hospitalsList) {
      return res.status(400).json({
        success: false,
        message: "No hospitals found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hospitals list",
      hospitalsList,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in listing hospitals",
    });
  }
};

exports.removeHospital = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if hospital exists
    const existingHospital = await Hospital.findById(id);
    if (!existingHospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const hospitalImageUrl = existingHospital.hospitalImage;

    if (
      hospitalImageUrl &&
      !hospitalImageUrl.includes("vecteezy.com")
    ) {
      const parts = hospitalImageUrl.split("/");
      const publicId = parts[parts.length - 1].split(".")[0]; // Extract filename without extension

      await cloudinary.uploader.destroy(`MEDISENSE/Hospital_Images/${publicId}`);
    }

    // Delete the hospital from the database
    await Hospital.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Hospital removed successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in removing hospital",
      error: err.message,
    });
  }
};
