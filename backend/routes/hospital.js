const express = require("express");
const router = express.Router();


const {addDoctor,listAllDoctors,removeDoctor}=require('../controllers/hospital/Doctor')
const {authMiddleware,isHospitalMiddleware}=require('../middlewares/auth')

const URL=process.env.Main_Url


router.post(`/add-doctor`,authMiddleware,isHospitalMiddleware,addDoctor)
router.get(`/list-all-doctors`,authMiddleware,isHospitalMiddleware,listAllDoctors)
router.delete(`/remove-doctor`,authMiddleware,isHospitalMiddleware,removeDoctor)



module.exports=router;