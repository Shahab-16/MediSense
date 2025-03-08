const Hospital = require("../../models/Hospitals");

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
      deparments,
      type,
      status,
      aboutHospital,
      acheivements,
      emergencyFacility,
      emergencyContact,
      icuBeds,
      advancedFacilities,
      visitingHours,
      maxConsultancyTime
    } = req.body;

    // Check for required fields
    if (
      !name ||
      !address ||
      !contact ||
      !email ||
      !ambulance ||
      !beds ||
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

    // Create a new hospital instance
    const newHospital = new Hospital({
      name,
      address,
      contact,
      email,
      doctors: doctors || [], // Default to an empty array if not provided
      facilities: facilities || [], // Default to an empty array if not provided
      ambulance,
      beds,
      establishedYear: establishedYear || null, // Default to null if not provided
      deparments: deparments || [], // Default to an empty array if not provided
      type,
      acheivements:acheivements || [],
      status: status || "open", // Default to 'open' if not provided
      aboutHospital: aboutHospital || "", // Default to an empty string if not provided
      emergencyFacility: emergencyFacility || false,
      emergencyContact: emergencyContact || "911-222-3333",
      icuBeds: icuBeds || 0,
      advancedFacilities: advancedFacilities || [],
      visitingHours: visitingHours || "9:00 AM - 8:00 PM",
      maxConsultancyTime: maxConsultancyTime || 30
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

    const existingHospital = await Hospital.findById(id);

    if (!existingHospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const removedHospital = await Hospital.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Hospital removed successfully",
      removedHospital,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in removing hospital",
    });
  }
};



