const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");

exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      userId,
      specialization,
      experience,
      hospitalId,
      consultationFee,
      availability,
    } = req.body;

    if (!hospitalId) {
      return res.status(400).json({ message: "Hospital ID is required" });
    }

    const newDoctor = new Doctor({
      name,
      userId,
      specialization,
      experience,
      hospitalId,
      consultationFee,
      availability,
    });

    await newDoctor.save();
    return res
      .status(201)
      .json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding doctor", error: error.message });
  }
};

exports.removeDoctor = async (req, res) => {
  try {
    const { doctorId, hospitalId } = req.params;

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
    const { hospitalId } = req.params;

    const doctors = await Doctor.find({ hospitalId })
      .populate("userId", "name email")
      .populate("hospitalId", "name");

    res
      .status(200)
      .json({ message: "Doctors retrieved successfully", doctors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message });
  }
};
