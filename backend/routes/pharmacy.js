const express = require("express");
const router = express.Router();


const {addMedicine,listAllMedicines,removeMedicine}=require('../controllers/pharmacy/MedicineStore')
const {authMiddleware,isPharmacyMiddleware}=require('../middlewares/auth')

const URL=process.env.Main_Url


router.post(`${URL}/pharmacy-name/add-medicine`,authMiddleware,isPharmacyMiddleware,addMedicine)
router.get(`${URL}/pharmacy-name/list-all-medicines`,authMiddleware,isPharmacyMiddleware,listAllMedicines)
router.delete(`${URL}/pharmacy-name/remove-medicine`,authMiddleware,isPharmacyMiddleware,removeMedicine)

module.exports=router;