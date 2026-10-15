const express = require("express");
const { createMessage, getMessages } = require("../controller/contact");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, admin, getMessages);

module.exports = router;
