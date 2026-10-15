const express = require("express");
const { getSupervisor, updateSupervisor } = require("../controller/supervisorController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/", getSupervisor);
router.put("/", protect, admin, updateSupervisor);

module.exports = router;
