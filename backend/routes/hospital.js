const express = require("express");
const router = express.Router();

const {addDoctor,listAllDoctors,deleteDoctor,bookAppointment}=require('../controllers/hospital/Hospital')


const URL=process.env.Main_Url


router.post(`/:hospitalId/add-doctor`,addDoctor);
router.get(`/:hospitalId/list-all-doctors`,listAllDoctors);
router.delete(`/:hospitalId/delete-doctor/:doctorId`,deleteDoctor);
router.post('/:hospitalId/book-appointment/:doctorId',bookAppointment);

module.exports=router;