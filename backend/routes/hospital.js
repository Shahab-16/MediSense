const express = require("express");
const router = express.Router();

const {
  addDoctor,
  listAllDoctors,
  deleteDoctor,
  bookAppointment,
} = require("../controllers/hospital/Hospital");
const { authMiddleware, isHospitalMiddleware } = require("../middlewares/auth");

// Middleware to replace hyphens with spaces in the hospitalId parameter
const formatHospitalId = (req, res, next) => {
  if (req.params.hospitalId) {
    req.params.hospitalId = req.params.hospitalId.replace(/-/g, " ");
  }
  next();
};

// Apply the middleware to all routes that use :hospitalId
router.use("/:hospitalName", formatHospitalId);

// Routes
router.post(
  "/:hospitalName/add-doctor",
  authMiddleware,
  isHospitalMiddleware,
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
