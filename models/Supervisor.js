const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema(
    {
        // ======================================================
        // BASIC INFORMATION
        // ======================================================

        personal: {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            designation: {
                type: String,
                required: true,
                trim: true,
            },

            department: {
                type: String,
                required: true,
                trim: true,
            },

            email: {
                type: String,
                default: "",
                trim: true,
            },

            scholar: {
                type: String,
                default: "",
            },

            Linkedln: {
                type: String,
                default: "",
            },

            Orcid: {
                type: String,
                default: "",
            },

            ResearchGate: {
                type: String,
                default: "",
            },

            image: {
                type: String,
                default: "",
            },
        },

        // ======================================================
        // SHORT PROFILE
        // ======================================================

        profile: {
            type: String,
            default: "",
        },

        // ======================================================
        // RESEARCH AREAS
        // ======================================================

        researchAreas: {
            type: [String],
            default: [],
        },

        // ======================================================
        // EDUCATION
        // ======================================================

        education: [
            {
                id: Number,

                degree: {
                    type: String,
                    default: "",
                },

                institution: {
                    type: String,
                    default: "",
                },

                year: {
                    type: String,
                    default: "",
                },

                detail: {
                    type: String,
                    default: "",
                },
            },
        ],

        // ======================================================
        // AWARDS & ACHIEVEMENTS
        // ======================================================

        awards: [
            {
                id: Number,

                title: {
                    type: String,
                    default: "",
                },

                organization: {
                    type: String,
                    default: "",
                },

                year: {
                    type: String,
                    default: "",
                },

                description: {
                    type: String,
                    default: "",
                },
            },
        ],

        // ======================================================
        // FUNDED PROJECTS / GRANTS
        // ======================================================

        grants: [
            {
                id: Number,

                agency: {
                    type: String,
                    default: "",
                },

                title: {
                    type: String,
                    default: "",
                },

                duration: {
                    type: String,
                    default: "",
                },

                amount: {
                    type: String,
                    default: "",
                },

                role: {
                    type: String,
                    default: "",
                },

                status: {
                    type: String,
                    default: "Ongoing",
                },
            },
        ],

        // ======================================================
        // RESEARCH STATISTICS
        // ======================================================

        statistics: [
            {
                id: Number,

                number: {
                    type: String,
                    default: "",
                },

                label: {
                    type: String,
                    default: "",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Supervisor", supervisorSchema);