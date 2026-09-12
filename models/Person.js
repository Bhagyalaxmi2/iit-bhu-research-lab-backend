const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: ["phd", "mtech", "alumni"]
        },

        image: {
            type: String,
            default: ""
        },

        designation: {
            type: String,
            required: true,
            trim: true
        },

        position: {
            type: String,
            default: ""
        },

        researchArea: {
            type: String,
            default: "",
            trim: true
        },

        enrollment: {
            type: String,
            default: ""
        },

        fellowship: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: ""
        },

        year: {
            type: String,
            default: ""
        },

        currentPosition: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;