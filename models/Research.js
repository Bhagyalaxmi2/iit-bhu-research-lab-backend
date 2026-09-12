const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        researchArea: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            default: "Active",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Research = mongoose.model("Research", researchSchema);

module.exports = Research;
