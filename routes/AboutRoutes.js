const express = require("express");

const router = express.Router();

const {

    getAllAbout,

    createAbout,

    updateAbout,

    deleteAbout

} = require("../controllers/aboutController");

router.get("/", getAllAbout);

router.post("/", createAbout);

router.put("/:id", updateAbout);

router.delete("/:id", deleteAbout);

module.exports = router;