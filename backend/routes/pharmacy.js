const express = require("express");
const router = express.Router();


const {addMedicine,listAllMedicines,deleteMedicine}=require('../controllers/pharmacy/MedicineStore')


router.post(`/add-medicine`,addMedicine)
router.get(`/list-all-medicines`,listAllMedicines)
router.delete(`/delete-medicine`,deleteMedicine)

module.exports=router;