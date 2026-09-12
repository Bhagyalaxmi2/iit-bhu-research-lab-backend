const Research = require("../models/Research");

const mongoose = require("mongoose");


// ==========================================
// GET ALL RESEARCH
// ==========================================

const getResearch = async (req, res) => {

    try {

        const research = await Research
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(research);

    } catch (error) {

        console.error("Fetch research error:", error);

        res.status(500).json({
            message: "Failed to fetch research",
            error: error.message
        });
    }
};


// ==========================================
// CREATE RESEARCH
// ==========================================

const createResearch = async (req, res) => {

    try {

        const {
            title,
            description,
            researchArea,
            image,
            status
        } = req.body;


        if (
            !title ||
            !description ||
            !researchArea
        ) {

            return res.status(400).json({
                message:
                    "Title, description and research area are required"
            });
        }


        const research = await Research.create({
            title,
            description,
            researchArea,
            image,
            status
        });


        res.status(201).json(research);

    } catch (error) {

        console.error("Create research error:", error);

        res.status(500).json({
            message: "Failed to create research",
            error: error.message
        });
    }
};


// ==========================================
// UPDATE RESEARCH
// ==========================================

const updateResearch = async (req, res) => {

    try {

        const { id } = req.params;


        const updatedResearch =
            await Research.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!updatedResearch) {

            return res.status(404).json({
                message: "Research not found"
            });
        }


        res.status(200).json(updatedResearch);

    } catch (error) {

        console.error("Update research error:", error);

        res.status(500).json({
            message: "Failed to update research",
            error: error.message
        });
    }
};



// ==========================================
// DELETE RESEARCH
// ==========================================

const deleteResearch = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("Delete request received");
        console.log("Research ID:", id);


        // Check whether ID exists
        if (!id) {

            return res.status(400).json({
                message: "Research ID is required"
            });
        }


        // Check whether ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                message: "Invalid research ID"
            });
        }


        // Delete document
        const deletedResearch =
            await Research.findByIdAndDelete(id);


        // Document does not exist
        if (!deletedResearch) {

            return res.status(404).json({
                message: "Research not found"
            });
        }


        console.log(
            "Research deleted:",
            deletedResearch.title
        );


        res.status(200).json({

            message: "Research deleted successfully",

            research: deletedResearch

        });

    } catch (error) {

        console.error(
            "Delete research error:",
            error
        );

        res.status(500).json({

            message: "Failed to delete research",

            error: error.message

        });
    }
};
// ==========================================
// EXPORT
// ==========================================

module.exports = {
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch
};