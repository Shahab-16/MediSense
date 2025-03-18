const express = require("express");
const router = express.Router();

const {
  addDoctor,
  listAllDoctors,
  deleteDoctor,
  bookAppointment,
} = require("../controllers/hospital/Hospital");
const { authMiddleware,isHospitalMiddleware } = require("../middlewares/auth");

const URL = process.env.Main_Url;

router.post(`/:hospitalName/add-doctor`,authMiddleware,isHospitalMiddleware,addDoctor);
router.get(`/:hospitalName/list-all-doctors`,authMiddleware,isHospitalMiddleware, listAllDoctors);
router.delete(`/:hospitalName/delete-doctor/:doctorId`,authMiddleware,isHospitalMiddleware, deleteDoctor);
router.post("/:hospitalName/book-appointment/:doctorId",authMiddleware,isHospitalMiddleware,bookAppointment);

module.exports = router;
