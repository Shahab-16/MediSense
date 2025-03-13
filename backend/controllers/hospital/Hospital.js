const Doctor = require("../../models/Doctors");
const Hospital = require("../../models/Hospitals");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const Appointment = require("../../models/Appointment");
const Doctors = require("../../models/Doctors");
const User = require("../../models/User");

const mongoose = require("mongoose");

exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      specialization,
      degree,
      available,
      fees,
      experience,
      about,
      address,
      date,
      slot_booked,
      currentPatients,
      pastPatients,
      languagesSpoken,
    } = req.body;

    const { hospitalId } = req.params;

    console.log(req.body);
    console.log(hospitalId);

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !specialization ||
      !degree ||
      !available ||
      !fees ||
      !experience ||
      !about ||
      !address ||
      !date ||
      !hospitalId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate hospitalId before conversion
    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hospital ID format",
      });
    }

    // Check if doctor with email or phone already exists
    const existingDoctor = await Doctor.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with the same email or phone already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImageUrl =
      "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg";

    // Upload profile image to Cloudinary if it exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MEDISENSE/Doctor_Profile_Images",
      });
      profileImageUrl = result.secure_url;
    }

    // Convert currentPatients and pastPatients to ObjectId array (only if valid)
    const convertToObjectIdArray = (ids) => {
      if (!Array.isArray(ids)) return [];
      return ids
        .filter((id) => mongoose.Types.ObjectId.isValid(id)) // Ensure IDs are valid
        .map((id) => new mongoose.Types.ObjectId(id));
    };

    const convertedCurrentPatients = convertToObjectIdArray(currentPatients);
    const convertedPastPatients = convertToObjectIdArray(pastPatients);

    // Create a new doctor with Cloudinary image URL
    const doctor = new Doctor({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage: profileImageUrl, // Save Cloudinary image URL
      specialization,
      degree,
      available,
      fees,
      experience,
      about,
      address,
      date,
      slot_booked: slot_booked || {},
      hospitalId: new mongoose.Types.ObjectId(hospitalId), // Convert hospitalId to ObjectId
      currentPatients: convertedCurrentPatients,
      pastPatients: convertedPastPatients,
      languagesSpoken,
    });

    // Save the doctor to the database
    await doctor.save();

    // Add the doctor to the hospital's doctors list
    await Hospital.findByIdAndUpdate(hospitalId, {
      $push: { doctors: doctor._id },
    });

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
    const { hospitalId, doctorId } = req.body;

    const hospital = await Hospital.findByIdAndUpdate(hospitalId, {
      $pull: { doctors: doctorId },
    });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const profileImageUrl = doctor.profileImage;

    await Doctor.findByIdAndDelete(doctorId);

    // Delete the image from Cloudinary if it’s not the default image
    if (
      profileImageUrl &&
      profileImageUrl.includes("no-profile-pic-icon-7.jpg")
    ) {
      const publicId = profileImageUrl.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(
        `MEDISENSE/Doctor_Profile_Images/${publicId}`
      );
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
      error: error.message,
    });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    //"-password" is done to remove password from doctor data
    const docData = await Doctors.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ succes: false, message: "Docter not available" });
    }
    let slot_booked = docData.slot_booked;
    if (slot_booked[slotDate]) {
      //check if the slotime is avalible or not is the slotdate
      if (slot_booked[slotDate].includes(slotTime)) {
        //if not available then return slot not avail
        return res.json({ succes: false, message: "slot not available" });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } //if not one has booked on this date then create a new bookin on this date;
    else {
      slot_booked[slotDate] = [];
      slot_booked[slotDate].push(slotTime);
    }
    const userData = await User.findById(userId).select("-password");
    delete docData.slot_booked;
    const appointmentdata = {
      docData,
      userData,
      docId,
      userId,
      amount: docData.fees,
      slotTime,
      slotDate,
    };
    const newAppointment = new Appointment(newAppointment);
    await newAppointment.save();

    // save new slotData in doctersData
    await Doctors.findByIdAndUpdate(docId, { slot_booked });
    res.json({ succes: true, message: "slot booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
