const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        authors: {
            type: [String],
            default: []
        },

        journal: {
            type: String,
            trim: true
        },

        year: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            default: "Published"
        },

        category: {
            type: String,
            default: ""
        },

        impactFactor: {
            type: String,
            default: ""
        },

        details: {
            type: String,
            default: ""
        },

        doi: {
            type: String,
            default: ""
        },

        link: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true
    }
);

const Publication =
    mongoose.model("Publication", publicationSchema);

module.exports = Publication;