const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const NOTIFICATION_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || "bhagya02012003@gmail.com";

const sendNotificationEmail = async ({ name, email, subject, message }) => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        return false;
    }

    const port = Number(SMTP_PORT);
    if (!Number.isInteger(port) || port <= 0) {
        throw new Error("SMTP_PORT must be a valid port number");
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
        from: process.env.SMTP_FROM || SMTP_USER,
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `[Research Lab contact] ${subject}`,
        text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return true;
};

// CREATE MESSAGE
const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body || {};
        if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim())) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const cleanMessage = {
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
        };

        // Keep the database as the reliable record even if email is not configured or unavailable.
        const newMessage = await Contact.create(cleanMessage);
        let emailNotificationSent = false;
        try {
            emailNotificationSent = await sendNotificationEmail(cleanMessage);
        } catch (emailError) {
            console.error("Contact notification email failed:", emailError.message);
        }

        return res.status(201).json({
            message: "Message received successfully",
            emailNotificationSent,
        });
    } catch (error) {
        console.error("Failed to save contact message:", error.message);
        return res.status(500).json({ message: "Failed to save your message. Please try again." });
    }
};

// GET ALL MESSAGES (admin only via route middleware)
const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(messages);
    } catch (error) {
        console.error("Failed to fetch contact messages:", error.message);
        return res.status(500).json({ message: "Failed to fetch messages" });
    }
};

module.exports = { createMessage, getMessages };