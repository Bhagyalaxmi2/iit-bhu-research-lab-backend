const Person = require("../models/Person");

// =====================================================
// GET ALL PEOPLE
// =====================================================

const getPeople = async (req, res) => {
    try {
        const people = await Person.find().sort({
            category: 1,
            createdAt: -1
        });

        res.status(200).json(people);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch people",
            error: error.message
        });
    }
};


// =====================================================
// CREATE PERSON
// =====================================================

const createPerson = async (req, res) => {
    try {

        const person = await Person.create(req.body);

        res.status(201).json(person);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create person",
            error: error.message
        });
    }
};


// =====================================================
// UPDATE PERSON
// =====================================================

const updatePerson = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedPerson =
            await Person.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedPerson) {
            return res.status(404).json({
                message: "Person not found"
            });
        }

        res.status(200).json(updatedPerson);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update person",
            error: error.message
        });
    }
};


// =====================================================
// DELETE PERSON
// =====================================================

const deletePerson = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedPerson =
            await Person.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({
                message: "Person not found"
            });
        }

        res.status(200).json({
            message: "Person deleted successfully",
            person: deletedPerson
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete person",
            error: error.message
        });
    }
};


module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
};