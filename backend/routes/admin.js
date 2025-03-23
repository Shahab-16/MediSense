const express = require("express");
const router = express.Router();
const { authMiddleware, isAdminMiddleware } = require("../middlewares/auth");
const {
  addHospital,
  listHospitals,
  removeHospital,
} = require("../controllers/admin/Hospital");
const {
  addMedicineStore,
  listAllMedicineStores,
  removeMedicineStore
} = require('../controllers/admin/Pharmacy');
const upload = require('../utils/multerConfig');

// Admin Routes
router.post("/hospital/add-hospital", authMiddleware, isAdminMiddleware, upload.single('hospitalImage'), addHospital);
router.get("/hospital/list-hospitals", authMiddleware, isAdminMiddleware, listHospitals);
router.delete("/hospital/remove-hospital/:id", authMiddleware, isAdminMiddleware, removeHospital);

router.post("/pharmacy/add-pharmacy", authMiddleware, isAdminMiddleware,upload.single('pharmacyImage'),addMedicineStore);
router.get("/pharmacy/list-all-pharmacies", authMiddleware, isAdminMiddleware, listAllMedicineStores);
router.delete("/pharmacy/remove-pharmacy/:id", authMiddleware, isAdminMiddleware, removeMedicineStore);

module.exports = router;