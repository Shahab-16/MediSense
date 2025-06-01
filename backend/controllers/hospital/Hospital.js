const Hospital = require("../../models/Hospitals");
const Doctor = require("../../models/Doctors");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const Appointment = require("../../models/Appointment");
const Doctors = require("../../models/Doctors");
const User = require("../../models/User");
const fs = require("fs");
const mongoose = require("mongoose");
const { measureMemory } = require("vm");
exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      specialization,
      degree, // Already a JSON string (e.g., '["MBBS"]')
      fees,
      address, // Already a JSON string (e.g., '{"line1":"Main Road,Rourkela"}')
      languagesSpoken,
    } = req.body;

    // No need to parse degree and address again
    const degreeArray = degree; // Already a JSON string
    const addressObject = address; // Already a JSON string

    // Find the hospital by name
    const hospitalName = req.params.hospitalName.replace(/-/g, " ");
    const hospital = await Hospital.findOne({ name: hospitalName });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
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
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "MEDISENSE/Doctor_Images",
        });
        profileImageUrl = result.secure_url;
        console.log("Cloudinary URL:", profileImageUrl);
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: err.message,
        });
      } finally {
        fs.unlinkSync(req.file.path); // Delete the temporary file
      }
    }

    // Create a new doctor with Cloudinary image URL
    const doctor = new Doctor({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage: profileImageUrl,
      specialization,
      degree: degreeArray, // Already a JSON string
      available: true,
      fees,
      address: addressObject, // Already a JSON string
      slot_booked: {},
      hospitalId: hospital._id,
      currentPatients: [],
      pastPatients: [],
      languagesSpoken,
    });

    // Save the doctor to the database
    await doctor.save();

    // Add the doctor to the hospital's doctors list
    await Hospital.findByIdAndUpdate(hospital._id, {
      $push: { doctors: doctor._id },
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in addDoctor controller:", error);
    res.status(500).json({
      success: false,
      message: "Error adding doctor",
      error: error.message,
    });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const hospitalName = req.params.hospitalName.replace(/-/g, " ");

    const hospital = await Hospital.findOneAndUpdate(
      { name: hospitalName },
      {
        $pull: { doctors: doctorId },
      }
    );

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Doctor.findByIdAndDelete(doctorId);

    res.status(200).json({ message: "Doctor removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing doctor", error: error.message });
  }
};

exports.listAllDoctors = async (req, res) => {
  try {
    const hospitalName = req.params.hospitalName.replace(/-/g, " ");

    console.log("Hospital Name in listing doctors:", hospitalName);

    // Check if hospitalId is provided
    if (!hospitalName) {
      return res.status(400).json({
        success: false,
        message: "Hospital Name is required",
      });
    }

    // Check if the hospital exists
    const existingHospital = await Hospital.findOne({ name: hospitalName });
    if (!existingHospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // Fetch doctors associated with the hospital
    const doctors = await Doctor.find({
      hospitalId: existingHospital._id,
    }).populate("hospitalId");

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
  // try {
  //   const { userId, docId, slotDate, slotTime } = req.body;
  //   //"-password" is done to remove password from doctor data
  //   const docData = await Doctors.findById(docId).select("-password");
  //   if (!docData.available) {
  //     return res.json({ succes: false, message: "Docter not available" });
  //   }
  //   let slot_booked = docData.slot_booked;
  //   if (slot_booked[slotDate]) {
  //     //check if the slotime is avalible or not is the slotdate
  //     if (slot_booked[slotDate].includes(slotTime)) {
  //       //if not available then return slot not avail
  //       return res.json({ succes: false, message: "slot not available" });
  //     } else {
  //       slot_booked[slotDate].push(slotTime);
  //     }
  //   } //if not one has booked on this date then create a new bookin on this date;
  //   else {
  //     slot_booked[slotDate] = [];
  //     slot_booked[slotDate].push(slotTime);
  //   }
  //   const userData = await User.findById(userId).select("-password");
  //   delete docData.slot_booked;
  //   const appointmentdata = {
  //     docData,
  //     userData,
  //     docId,
  //     userId,
  //     amount: docData.fees,
  //     slotTime,
  //     slotDate,
  //   };
  //   const newAppointment = new Appointment(newAppointment);
  //   await newAppointment.save();

  //   // save new slotData in doctersData
  //   await Doctors.findByIdAndUpdate(docId, { slot_booked });
  //   res.json({ succes: true, message: "slot booked" });
  // } catch (error) {
  //   console.log(error);
  //   res.json({ success: false, message: error.message });
  // }

  try{
    const {docName,dateTime,time}=req.body;
    const userId=req.user._id;
    console.log("docName",docName);
    console.log("userId coming from auth",userId);
    const doctor=await Doctor.findOne({name:docName});
    if(!doctor){
      return res.json({sucess:false,message:"doctor not found"});
    }
    const date=new Date(dateTime);
    const dayKey=date.toISOString().split("T")[0];

    if(doctor.slot_booked?.[dayKey]?.includes(time)){
      return res.json("Time slot already booked");
    }
    if(!doctor.slot_booked[dayKey]){
      doctor.slot_booked[dayKey]=[];
    }
    doctor.slot_booked[dayKey].push(time);

    if(!doctor.currentPatients.includes(userId)){
      doctor.currentPatients.push(userId);
    }
    await doctor.save();
    return res.json({
      sucess:true,
      message:"Appointment booked succesfully",
      slot:{day:dayKey,time},
    })
  } catch(error){
    console.log("error in appointment controller",error.message);
    return res.json({
      sucess:false,
      message:error.message
    })
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctors.find();

    if (!allDoctors || allDoctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found",
      });
    }

    return res.status(200).json({
      success: true,
      data: allDoctors,
    });
  } catch (err) {
    console.log("error in get all doctors controllers", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching doctors",
    });
  }
};

exports.getAllHopitals = async (req,res)=>{
  try{
    const allHospitals=await Hospital.find();
    if(!allHospitals || allHospitals.length===0){
      return res.status(404).json({
        success:false,
        message:"could not find all all hospitals"
      })
    }
    return res.status(200).json({
      succes:true,
      data:allHospitals
    })
  } catch(error){
    console.log("error in get all hospitals controller", error);
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
}
exports.getHospitalByName = async (req, res) => {
  try {
    const HosName = req.params.name; 

    const hospital = await Hospital.findOne({ name: HosName }); 
    console.log("Hospital found:", hospital);

    if (!hospital) {
      return res.status(404).json({
        message: "Could not find this hospital",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      data: hospital
    });

  } catch (error) {
    console.error("Error finding hospital by name:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

