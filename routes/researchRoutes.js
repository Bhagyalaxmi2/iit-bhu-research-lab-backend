const express = require("express");
const { getResearch, createResearch, updateResearch, deleteResearch } = require("../controller/researchController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/", getResearch);
router.post("/", protect, admin, createResearch);
router.put("/:id", protect, admin, updateResearch);
router.delete("/:id", protect, admin, deleteResearch);

module.exports = router;
