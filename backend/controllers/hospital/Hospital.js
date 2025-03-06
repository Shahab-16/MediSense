const Doctor = require("../../models/Doctors");
const Hospital = require("../../models/Hospitals");

exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      profileImage,
      specialization,
      hospitalId,
      experience,
      consultationFee,
      availability,
      education,
      languagesSpoken,
    } = req.body;

    const existingDoctor = await Doctor.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor with the same email or phone already exists",
      });
    }

    // Create a new doctor
    const doctor = new Doctor({
      name,
      email,
      phone,
      profileImage,
      specialization,
      hospitalId,
      experience,
      consultationFee,
      availability,
      education,
      languagesSpoken,
    });

    // Save the doctor
    await doctor.save();

    // Add the doctor to the hospital's doctors list
    await Hospital.findByIdAndUpdate(hospitalId, {
      $push: { doctors: doctor._id },
    });

    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error: error.message });
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

    const doctors = await Doctor.find({ hospitalId })
      .populate("hospitalId", "name")
      .populate("currentPatients", "name email")
      .populate("pastPatients", "name email")
      .select(
        "name email phone specialization experience consultationFee availability ratings languagesSpoken profileImage"
      );

    res.status(200).json({
      message: "Doctors retrieved successfully",
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};
