const express = require("express");

const {
    getSupervisor,
    updateSupervisor,
} = require("../controller/supervisorController");

const router = express.Router();


// ======================================================
// GET SUPERVISOR
// GET /api/supervisor
// ======================================================

router.get("/", getSupervisor);


// ======================================================
// UPDATE SUPERVISOR
// PUT /api/supervisor
// ======================================================

router.put("/", updateSupervisor);


module.exports = router;