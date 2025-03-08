const Doctor = require("../../models/Doctors");
const Hospital = require("../../models/Hospitals");
const bcrypt = require("bcrypt");

exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      profileImage,
      specialization,
      degree,
      available,
      consultationFee,
      experience,
      about,
      address,
      date,
      slot_booked,
      hospitalId,
      currentPatients,
      pastPatients,
      languagesSpoken,
    } = req.body;


    if (!name || !email || !phone || !password || !specialization || !degree || !available || !consultationFee || !experience || !about || !address || !date || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if(!isvalidEmail(email)){
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check if doctor with email or phone already exists
    const existingDoctor = await Doctor.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with the same email or phone already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor
    const doctor = new Doctor({
      name,
      email,
      phone,
      password: hashedPassword, // Store hashed password
      profileImage,
      specialization,
      degree,
      available,
      consultationFee,
      experience,
      about,
      address,
      date,
      slot_booked: slot_booked || {}, // Default to an empty object if not provided
      hospitalId,
      currentPatients: currentPatients || [], // Default to empty array
      pastPatients: pastPatients || [], // Default to empty array
      languagesSpoken,
    });

    // Save the doctor to the database
    await doctor.save();

    // Add the doctor to the hospital's doctors list
    if (hospitalId) {
      await Hospital.findByIdAndUpdate(hospitalId, {
        $push: { doctors: doctor._id },
      });
    }

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding doctor",
      error: error.message,
    });
  }
};


exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId, hospitalId } = req.body;

    const hospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      { $pull: { doctors: doctorId } }
    );

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const doctor = await Doctor.findOneAndDelete({ _id: doctorId, hospitalId });

    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found in the specified hospital" });
    }

    res.status(200).json({ message: "Doctor removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing doctor", error: error.message });
  }
};

exports.listAllDoctors = async (req, res) => {
  try {
      const { hospitalId } = req.body;

      // Check if hospitalId is provided
      if (!hospitalId) {
          return res.status(400).json({
              success: false,
              message: "Hospital ID is required",
          });
      }

      // Check if the hospital exists
      const existingHospital = await Hospital.findById(hospitalId);
      if (!existingHospital) {
          return res.status(404).json({
              success: false,
              message: "Hospital not found",
          });
      }

      // Fetch doctors associated with the hospital
      const doctors = await Doctor.find({ hospitalId }).populate("hospitalId");

      // Check if any doctors are found
      if (doctors.length === 0) {
          return res.status(404).json({
              success: false,
              message: "There are no doctors in this hospital",
          });
      }

      // Success response
      return res.status(200).json({
          success: true,
          message: "Doctors list retrieved successfully",
          doctors,
      });

  } catch (error) {
      res.status(500).json({ 
          success: false,
          message: "Internal server error",
          error: error.message 
      });
  }
};

