const express = require("express");
const router = express.Router();

const {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication
} = require("../controller/publicationController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Public
router.get("/", getPublications);

// Admin only
router.post("/", protect, admin, createPublication);
router.put("/:id", protect, admin, updatePublication);
router.delete("/:id", protect, admin, deletePublication);

module.exports = router;