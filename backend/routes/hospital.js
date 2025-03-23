const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");

const {
  addDoctor,
  listAllDoctors,
  deleteDoctor,
  bookAppointment,
} = require("../controllers/hospital/Hospital");
const { authMiddleware, isHospitalMiddleware } = require("../middlewares/auth");

// Middleware to replace hyphens with spaces in the hospitalName parameter
const formatHospitalName = (req, res, next) => {
  if (req.params.hospitalName) {
    req.params.hospitalName = req.params.hospitalName.replace(/-/g, " ");
  }
  next();
};

// Apply the middleware to all routes that use :hospitalName
router.use("/:hospitalName", formatHospitalName);

// Routes
router.post(
  "/:hospitalName/add-doctor",
  authMiddleware,
  isHospitalMiddleware,
  upload.single("profileImage"),
  addDoctor
);
router.get(
  "/:hospitalName/list-all-doctors",
  authMiddleware,
  isHospitalMiddleware,
  listAllDoctors
);
router.delete(
  "/:hospitalName/delete-doctor/:doctorId",
  authMiddleware,
  isHospitalMiddleware,
  deleteDoctor
);
router.post(
  "/:hospitalName/book-appointment/:doctorId",
  authMiddleware,
  isHospitalMiddleware,
  bookAppointment
);

module.exports = router;