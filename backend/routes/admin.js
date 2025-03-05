const express = require("express");
const router = express.Router();

const { addHospital, listHospitals, removeHospital } = require("../controllers/admin/Hospital");
const { addPharmacy, listAllPharmacies, removePharmacy } = require("../controllers/admin/Pharmacy");

//const { authMiddleware, isAdminMiddleware } = require("../middlewares/auth");


router.post("/hospital/add-hospital",addHospital);
router.get("/hospital/list-hospital",listHospitals);
router.delete("/hospital/remove-hospital",removeHospital);

router.post("/pharmacy/add-pharmacy",addPharmacy);
router.get("/pharmacy/list-all-pharmacies",listAllPharmacies);
router.delete("/pharmacy/remove-pharmacy",removePharmacy);

module.exports = router;
