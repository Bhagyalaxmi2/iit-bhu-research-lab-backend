const About = require("../models/About");

// =========================
// GET ALL RESEARCH CARDS
// =========================
exports.getAllAbout = async (req, res) => {

    try {

        const cards = await About.find();

        res.status(200).json(cards);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// CREATE NEW RESEARCH CARD
// =========================
exports.createAbout = async (req, res) => {

    try {

        const card = await About.create(req.body);

        res.status(201).json({
            success: true,
            message: "Research Card Added Successfully",
            data: card
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// UPDATE RESEARCH CARD
// =========================
exports.updateAbout = async (req, res) => {

    try {

        const updatedCard = await About.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        if (!updatedCard) {

            return res.status(404).json({
                success: false,
                message: "Research Card Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Research Card Updated Successfully",
            data: updatedCard
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// DELETE RESEARCH CARD
// =========================
exports.deleteAbout = async (req, res) => {

    try {

        const deletedCard = await About.findByIdAndDelete(req.params.id);

        if (!deletedCard) {

            return res.status(404).json({
                success: false,
                message: "Research Card Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Research Card Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};