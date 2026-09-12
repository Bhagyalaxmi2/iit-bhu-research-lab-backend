const express = require("express");

const {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
} = require("../controller/personController");

const router = express.Router();


// GET all people
router.get("/", getPeople);


// CREATE person
router.post("/", createPerson);


// UPDATE person
router.put("/:id", updatePerson);


// DELETE person
router.delete("/:id", deletePerson);


module.exports = router;