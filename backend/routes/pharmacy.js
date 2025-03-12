const express = require("express");
const router = express.Router();


const {addMedicine,listAllMedicines,deleteMedicine}=require('../controllers/pharmacy/MedicineStore')


router.post(`/:pharmacyId/add-medicine`,addMedicine)
router.get(`/:pharmacyId/list-all-medicines`,listAllMedicines)
router.delete(`/:pharmacyId/delete-medicine`,deleteMedicine)

module.exports=router;