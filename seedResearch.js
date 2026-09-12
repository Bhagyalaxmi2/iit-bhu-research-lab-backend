const mongoose = require("mongoose");
require("dotenv").config();

const Research = require("./models/Research");


// Research data
const researchData = [

    {
        title: "Pharmaceutical Nanotechnology and Drug Delivery",
        description:
            "Research focused on the development and characterization of nanotechnology-based drug delivery systems for improving therapeutic efficacy and targeted drug delivery.",
        researchArea: "Pharmaceutical Nanotechnology",
        image: "",
        status: "Active"
    },

    {
        title: "Nanoparticle-Based Drug Delivery Systems",
        description:
            "Development of nanoparticle-based systems designed to improve drug solubility, stability, bioavailability and controlled delivery.",
        researchArea: "Nanoparticle Drug Delivery",
        image: "",
        status: "Active"
    },

    {
        title: "Targeted Drug Delivery",
        description:
            "Investigation of strategies for delivering therapeutic agents to specific tissues or cells to enhance therapeutic outcomes and minimize unwanted effects.",
        researchArea: "Targeted Drug Delivery",
        image: "",
        status: "Active"
    },

    {
        title: "Controlled and Sustained Drug Release",
        description:
            "Design and evaluation of drug delivery systems capable of controlling the release of therapeutic agents over a desired period of time.",
        researchArea: "Controlled Drug Delivery",
        image: "",
        status: "Active"
    },

    {
        title: "Nanoformulation Development",
        description:
            "Development and optimization of pharmaceutical nanoformulations to improve the physicochemical and biopharmaceutical properties of drug molecules.",
        researchArea: "Nanoformulation",
        image: "",
        status: "Active"
    },

    {
        title: "Drug Delivery Characterization and Evaluation",
        description:
            "Evaluation of pharmaceutical formulations using physicochemical, analytical and drug-release characterization techniques.",
        researchArea: "Formulation Characterization",
        image: "",
        status: "Active"
    },

    {
        title: "Nanocarriers for Therapeutic Applications",
        description:
            "Exploration of nanoscale carrier systems for the efficient transport and delivery of therapeutic molecules.",
        researchArea: "Nanocarrier Systems",
        image: "",
        status: "Active"
    },

    {
        title: "Advanced Pharmaceutical Formulations",
        description:
            "Research and development of advanced formulation approaches to overcome challenges associated with conventional drug delivery systems.",
        researchArea: "Advanced Drug Delivery",
        image: "",
        status: "Active"
    }

];


const seedResearch = async () => {

    try {

        // Connect MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");


        // Insert research data
        await Research.insertMany(researchData);

        console.log(
            `${researchData.length} research records inserted successfully`
        );


        // Close connection
        await mongoose.connection.close();

        console.log("MongoDB connection closed");

    } catch (error) {

        console.error(
            "Error seeding research data:",
            error.message
        );

        process.exit(1);
    }
};


seedResearch();