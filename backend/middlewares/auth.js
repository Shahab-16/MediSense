const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");
const MedicalStore = require("../models/MedicalStore");

// General Auth Middleware
exports.authMiddleware = async (req, res, next) => {
  try {
    const token =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer ", "") || req.body.token || req.query.token || req.headers.token;
  console.log("Token is getting printed and present in backend of auth middleware", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required in authMiddleware",
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
        console.log("Printing pharmacy details", user);
        break;
      case "admin":
        // Hardcoded admin object
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

    // Attach user and role to the request object
    req.user = {
      ...(user.toObject ? user.toObject() : user), // Convert Mongoose document to plain object if it exists
      role: decoded.role, // Explicitly add the role from the token
    };

    next();
  } catch (err) {
    console.error("Error in authMiddleware:", err); // Log the error for debugging
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