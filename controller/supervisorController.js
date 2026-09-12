const Supervisor = require("../models/Supervisor");

// ======================================================
// GET SUPERVISOR
// ======================================================

const getSupervisor = async (req, res) => {
    try {
        const supervisor = await Supervisor.findOne();

        if (!supervisor) {
            return res.status(404).json({
                message: "Supervisor data not found",
            });
        }

        res.status(200).json(supervisor);
    } catch (error) {
        console.error("Error fetching supervisor:", error);

        res.status(500).json({
            message: "Failed to fetch supervisor data",
            error: error.message,
        });
    }
};


// ======================================================
// UPDATE SUPERVISOR
// ======================================================

const updateSupervisor = async (req, res) => {
    try {
        const supervisor = await Supervisor.findOneAndUpdate(
            {},
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!supervisor) {
            return res.status(404).json({
                message: "Supervisor data not found",
            });
        }

        res.status(200).json(supervisor);
    } catch (error) {
        console.error("Error updating supervisor:", error);

        res.status(500).json({
            message: "Failed to update supervisor data",
            error: error.message,
        });
    }
};


module.exports = {
    getSupervisor,
    updateSupervisor,
};