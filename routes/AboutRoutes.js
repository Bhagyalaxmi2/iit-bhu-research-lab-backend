const express = require("express");
const router = express.Router();
const { getAllAbout, createAbout, updateAbout, deleteAbout } = require("../controller/aboutController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getAllAbout);
router.post("/", protect, admin, createAbout);
router.put("/:id", protect, admin, updateAbout);
router.delete("/:id", protect, admin, deleteAbout);

module.exports = router;
