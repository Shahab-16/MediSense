const express = require("express");
const router = express.Router();

const {
  addMedicine,
  listAllMedicines,
  deleteMedicine,
} = require("../controllers/pharmacy/MedicineStore");
const { authMiddleware, isPharmacyMiddleware } = require("../middlewares/auth");

// Middleware to replace hyphens with spaces in the pharmacyName parameter
const formatPharmacyName = (req, res, next) => {
  if (req.params.pharmacyName) {
    req.params.pharmacyName = req.params.pharmacyName.replace(/-/g, " ");
  }
  next();
};

// Apply the middleware to all routes that use :pharmacyName
router.use("/:pharmacyName", formatPharmacyName);

// Routes
router.post(
  "/:pharmacyName/add-medicine",
  authMiddleware,
  isPharmacyMiddleware,
  addMedicine
);
router.get(
  "/:pharmacyName/list-all-medicines",
  authMiddleware,
  isPharmacyMiddleware,
  listAllMedicines
);
router.delete(
  "/:pharmacyName/delete-medicine/:medicineId",
  authMiddleware,
  isPharmacyMiddleware,
  deleteMedicine
);

module.exports = router;
