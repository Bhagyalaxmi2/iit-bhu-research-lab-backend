const express = require("express");

const {
    getPublications,
    createPublication,
    updatePublication,
    deletePublication
} = require("../controller/publicationController");

const router = express.Router();


// GET all publications
router.get("/", getPublications);


// CREATE publication
router.post("/", createPublication);

// UPDATE publication
router.put("/:id", updatePublication);

// DELETE publication
router.delete("/:id", deletePublication);

module.exports = router;