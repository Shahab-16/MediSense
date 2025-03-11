const express = require("express");
const router = express.Router();

const { addHospital, listHospitals, removeHospital } = require("../controllers/admin/Hospital");
const { addMedicineStore, listAllMedicineStores, removeMedicineStore } = require("../controllers/admin/Pharmacy");

const { authMiddleware, isAdminMiddleware } = require("../middlewares/auth");

// Routes for Hospitals
router.post('/hospital/add-hospital', addHospital);
router.get('/hospital/list-hospitals', listHospitals);
router.delete('/hospital/remove-hospital/:id', removeHospital);

// Routes for Pharmacies
router.post('/pharmacy/add-pharmacy', addMedicineStore);
router.get('/pharmacy/list-all-pharmacies', listAllMedicineStores);
router.delete('/pharmacy/remove-pharmacy/:id', removeMedicineStore);

module.exports = router;