const Contact = require("../models/Contact");

// CREATE MESSAGE
const createMessage = async (req, res) => {
    try {

        // Step 1: Get form data
        const { name, email, subject, message } = req.body;

        // Step 2: Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Step 3: Save message to MongoDB
        const newMessage = await Contact.create({
            name,
            email,
            subject,
            message
        });

        // Step 4: Send success response
        res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to send message",
            error: error.message
        });
    }
};


// GET ALL MESSAGES
const getMessages = async (req, res) => {
    try {

        const messages = await Contact.find()
            .sort({ createdAt: -1 });

        res.status(200).json(messages);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch messages",
            error: error.message
        });
    }
};


module.exports = {
    createMessage,
    getMessages
};