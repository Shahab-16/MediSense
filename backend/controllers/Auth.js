const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpgenerator = require("otp-generator");
const User = require("../models/User");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");
const MedicalStore = require("../models/MedicalStore");
const OTP = require("../models/OTP");

// Signup (Only for User/Patient)
exports.Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Fetch the most recent OTP for the given email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || response[0].OTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signup",
    });
  }
};

// Login for All Roles (User, Hospital, Doctor, Pharmacy, Admin)
exports.Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields (email, password, role) are required",
      });
    }

    let user;
    let payload;

    switch (role) {
      case "user":
        user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "User not found",
          });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({
            success: false,
            message: "Password is incorrect",
          });
        }
        payload = {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: "user",
        };
        break;

      case "hospital":
        user = await Hospital.findOne({ email });
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Hospital not found",
          });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({
            success: false,
            message: "Password is incorrect",
          });
        }
        payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "hospital",
        };
        console.log(payload);
        break;

      case "doctor":
        user = await Doctor.findOne({ email });
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Doctor not found",
          });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({
            success: false,
            message: "Password is incorrect",
          });
        }
        payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "doctor",
        };
        break;

      case "pharmacy":
        user = await MedicalStore.findOne({ email });
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Pharmacy not found",
          });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({
            success: false,
            message: "Password is incorrect",
          });
        }
        payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "pharmacy", // Ensure this is set correctly
        };
        console.log(payload);
        break;

      case "admin":
        // Hardcoded admin credentials
        if (
          email === "mdshahabuddin0516@gmail.com" &&
          password === "87654321"
        ) {
          payload = {
            id: "Shahab16",
            name: "Shahab",
            email: "mdshahabuddin0516@gmail.com",
            role: "admin",
          };
        } else {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password for admin",
          });
        }
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid role specified",
        });
    }

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Remove sensitive data before sending the response
    if (user) {
      user.password = undefined;
    }

    return res.status(200).json({
      success: true,
      token,
      user: payload,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} Login Success`,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in login",
    });
  }
};

// Send OTP (For User Signup)
exports.SendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate a unique OTP
    let otp;
    let isUnique = false;

    do {
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const existingOTP = await OTP.findOne({ OTP: otp });
      if (!existingOTP) {
        isUnique = true; // OTP is unique
      }
    } while (!isUnique);

    // Save the OTP to the database
    const otpPayload = { email, OTP: otp };
    const otpBody = await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpBody,
    });
  } catch (error) {
    console.error("Error in SendOTP:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in sending OTP",
    });
  }
};

// Verify OTP (For User Signup)
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Fetch the most recent OTP for the given email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || response[0].OTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during OTP verification",
    });
  }
};

// Change Password (For All Roles)
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    let user;
    switch (role) {
      case "user":
        user = await User.findById(userId);
        break;
      case "hospital":
        user = await Hospital.findById(userId);
        break;
      case "doctor":
        user = await Doctor.findById(userId);
        break;
      case "pharmacy":
        user = await MedicalStore.findById(userId);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid role specified",
        });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate old password
    if (role === "user") {
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }
    } else {
      if (oldPassword !== user.password) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error during password change:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during password change",
    });
  }
};
