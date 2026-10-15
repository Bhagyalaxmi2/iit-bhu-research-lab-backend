const express = require("express");
const { register, login } = require("../controller/authController");
const router = express.Router();

router.post("/register", (req, res, next) => {
  const registrationKey = process.env.ADMIN_REGISTRATION_KEY;
  if (
    process.env.ALLOW_ADMIN_REGISTRATION !== "true" ||
    !registrationKey ||
    req.body.registrationKey !== registrationKey
  ) {
    return res.status(403).json({ message: "Admin registration is disabled." });
  }

  const { registrationKey: _registrationKey, ...registration } = req.body;
  req.body = registration;
  return register(req, res, next);
});

router.post("/login", login);
module.exports = router;
