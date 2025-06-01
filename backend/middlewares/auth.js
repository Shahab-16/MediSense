const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");
const MedicalStore = require("../models/MedicalStore");

exports.authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from various sources
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

    console.log("Decoded JWT:", decoded); // ✅ Debug: verify structure

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
        user = { _id: decoded.id, role: "admin" }; // admin doesn't need DB
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

    // ✅ Always include user ID and role
    req.user = {
      id: user._id?.toString(),
      ...(user.toObject ? user.toObject() : user),
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Role-based guards

exports.isAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied. Admin only." });
  }
  next();
};

exports.isHospitalMiddleware = (req, res, next) => {
  if (req.user.role !== "hospital") {
    return res.status(403).json({ success: false, message: "Access denied. Hospital only." });
  }
  next();
};

exports.isPharmacyMiddleware = (req, res, next) => {
  if (req.user.role !== "pharmacy" && req.user.role !== "hospital") {
    return res.status(403).json({ success: false, message: "Access denied. Pharmacy or hospital only." });
  }
  next();
};

exports.isDoctorMiddleware = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ success: false, message: "Access denied. Doctor only." });
  }
  next();
};

exports.isUserMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ success: false, message: "Access denied. User only." });
  }
  next();
};
