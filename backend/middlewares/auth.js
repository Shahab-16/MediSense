const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");
const MedicalStore = require("../models/MedicalStore");

exports.authMiddleware = async (req, res, next) => {
  try {
    // 1. Check for token in multiple locations
    const token =
      req.cookies.token ||
      req.headers["authorization"]?.replace("Bearer ", "") ||
      req.body.token ||
      req.query.token ||
      req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    // 2. Verify token
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
        user = { id: decoded.id, role: "admin" };
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

    req.user = {
      ...(user.toObject ? user.toObject() : user),
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// [Keep all existing role-specific middlewares: isAdminMiddleware, etc.]
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
  console.log("User role:", req.user.role);
  if (req.user.role !== "pharmacy" && req.user.role !== "hospital") {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not a pharmacy or hospital.",
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