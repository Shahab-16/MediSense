const express = require("express");
const router = express.Router();

const {addDoctor,listAllDoctors,deleteDoctor}=require('../controllers/hospital/Hospital')


const URL=process.env.Main_Url


router.post(`/add-doctor`,addDoctor)
router.get(`/list-all-doctors`,listAllDoctors)
router.delete(`/delete-doctor`,deleteDoctor)


module.exports=router;