const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");
const MedicalStore = require("../models/MedicalStore");

// General Auth Middleware
exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.body.token || req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    switch (decoded.role) {
      case "user":
        user = await User.findById(decoded.id);
        break;
      case "hospital":
        user = await Hospital.findById(decoded.id);
        break;
      case "doctor":
        user = await Doctor.findById(decoded.id);
        break;
      case "pharmacy":
        user = await MedicalStore.findById(decoded.id);
        break;
      case "admin":
        user = { id: decoded.id, role: "admin" }; // Admin is hardcoded
        break;
      default:
        return res.status(401).json({
          success: false,
          message: "Invalid role",
        });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};

// Role-Specific Middlewares
exports.isAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not an admin.",
    });
  }
  next();
};

exports.isHospitalMiddleware = (req, res, next) => {
  if (req.user.role !== "hospital") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not a hospital.",
    });
  }
  next();
};

exports.isPharmacyMiddleware = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role !== "pharmacy") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not a pharmacy.Mistake here in role",
    });
  }
  next();
};

exports.isDoctorMiddleware = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not a doctor.",
    });
  }
  next();
};

exports.isUserMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not a user.",
    });
  }
  next();
};