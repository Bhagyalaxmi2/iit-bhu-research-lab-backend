const express = require("express");

const {
  register,
  login
} = require("../controller/authController");

const router = express.Router();

// Register admin
router.post("/register", register);

// Login admin
router.post("/login", login);

module.exports = router;