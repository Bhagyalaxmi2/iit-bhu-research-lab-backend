const Publication = require("../models/Publication");


// ==========================================
// GET ALL PUBLICATIONS
// ==========================================

const getPublications = async (req, res) => {
    try {

        // Get all publications from MongoDB
        const publications = await Publication
            .find()
            .sort({ year: -1 });

        // Send data to frontend
        res.status(200).json(publications);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch publications",
            error: error.message
        });
    }
};


// ==========================================
// CREATE NEW PUBLICATION
// ==========================================

const createPublication = async (req, res) => {
    try {

        // Get data sent by frontend/Postman
        const {
            title,
            authors,
            journal,
            year,
            status,
            doi,
            impactFactor,
            link
        } = req.body;


        // Create new publication
        const publication = await Publication.create({

            title,
            authors,
            journal,
            year,
            status,
            doi,
            impactFactor,
            link

        });


        // Send newly created publication back
        res.status(201).json(publication);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create publication",
            error: error.message
        });
    }
};

// ==========================================
// UPDATE PUBLICATION
// ==========================================

const updatePublication = async (req, res) => {
    try {

        // Get publication ID from URL
        const { id } = req.params;

        // Find publication and update it
        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // If publication doesn't exist
        if (!updatedPublication) {
            return res.status(404).json({
                message: "Publication not found"
            });
        }

        // Send updated publication
        res.status(200).json(updatedPublication);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update publication",
            error: error.message
        });
    }
};

// ==========================================
// DELETE PUBLICATION
// ==========================================

const deletePublication = async (req, res) => {
    try {

        // Get ID from URL
        const { id } = req.params;

        // Find and delete publication
        const deletedPublication =
            await Publication.findByIdAndDelete(id);

        // If publication doesn't exist
        if (!deletedPublication) {
            return res.status(404).json({
                message: "Publication not found"
            });
        }

        // Send success response
        res.status(200).json({
            message: "Publication deleted successfully",
            publication: deletedPublication
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete publication",
            error: error.message
        });
    }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
    getPublications,
    createPublication,
    updatePublication,
    deletePublication
};