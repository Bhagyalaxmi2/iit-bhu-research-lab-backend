const express = require("express");

const {
    createMessage,
    getMessages
} = require("../controller/contact");

const router = express.Router();


// POST contact message
router.post("/", createMessage);


// GET all contact messages
router.get("/", getMessages);


module.exports = router;