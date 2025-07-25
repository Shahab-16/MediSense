const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");

const {
  addDoctor,
  listAllDoctors,
  deleteDoctor,
  bookAppointment,
  getAllDoctors,
  getAllHopitals,
  getHospitalByName,
  getDoctorByName,
  getPatientByIds
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
  // authMiddleware,
  // isHospitalMiddleware,
  listAllDoctors
);
router.delete(
  "/:hospitalName/delete-doctor/:doctorId",
  authMiddleware,
  isHospitalMiddleware,
  deleteDoctor
);
router.get(
  "/get-all-doctors",
  //  authMiddleware,
  //  isHospitalMiddleware,
   getAllDoctors
);
router.get(
  "/get-all-hospitals",
   //  authMiddleware,
  //  isHospitalMiddleware,
   getAllHopitals
)
router.get(
  "/:get-name",
  getHospitalByName
)
router.get('/findDoctor/:name', getDoctorByName); 
router.post('/getPatientByIds',getPatientByIds)
module.exports = router;