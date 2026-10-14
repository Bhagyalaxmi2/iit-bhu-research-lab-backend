const express = require("express");

const {
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch
} = require("../controller/researchController");

const router = express.Router();


router.get("/", getResearch);

router.post("/", createResearch);

router.put("/:id", updateResearch);

router.delete("/:id", deleteResearch);

module.exports = router;