const express = require("express");
const { getPeople, createPerson, updatePerson, deletePerson } = require("../controller/personController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/", getPeople);
router.post("/", protect, admin, createPerson);
router.put("/:id", protect, admin, updatePerson);
router.delete("/:id", protect, admin, deletePerson);

module.exports = router;
