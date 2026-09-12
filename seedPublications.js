const fs = require("fs");
const path = require("path");
const vm = require("vm");

const mongoose = require("mongoose");
require("dotenv").config();

const Publication = require("./models/Publication");


// ==========================================
// STEP 1 — Read publicationData.js
// ==========================================

const filePath = path.join(
    __dirname,
    "../LabWebpage/src/components/Publications/publicationData.js"
);

let fileContent = fs.readFileSync(filePath, "utf8");


// ==========================================
// STEP 2 — Remove ES module exports
// ==========================================

fileContent = fileContent
    .replace(
        /export const googleScholarUrl[\s\S]*?;\s*/,
        ""
    )
    .replace(
        /export default publicationData;\s*/,
        ""
    );


// ==========================================
// STEP 3 — Create a temporary environment
// ==========================================

const sandbox = {};

vm.createContext(sandbox);


// ==========================================
// STEP 4 — Extract publicationData
// ==========================================

vm.runInContext(
    `${fileContent}\nthis.publicationData = publicationData;`,
    sandbox
);

const publicationData = sandbox.publicationData;


// ==========================================
// STEP 5 — Connect MongoDB
// ==========================================

const seedDatabase = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        console.log(
            `Found ${publicationData.length} publications`
        );


        // ==========================================
        // STEP 6 — Clear old publications
        // ==========================================

        await Publication.deleteMany({});

        console.log("Old publications removed");


        // ==========================================
        // STEP 7 — Insert all publications
        // ==========================================

        await Publication.insertMany(
            publicationData.map((publication) => ({

                title: publication.title,

                authors: publication.authors
                    .split(",")
                    .map((author) => author.trim()),

                journal: publication.journal,

                year: publication.year,

                status: publication.status,

                category: publication.category,

                impactFactor: publication.impactFactor || "",

                details: publication.details || "",

                doi: publication.doi || "",

                link: publication.link || ""

            }))
        );


        console.log(
            "All publications inserted successfully!"
        );

        console.log(
            `Total inserted: ${publicationData.length}`
        );


        // ==========================================
        // STEP 8 — Close MongoDB connection
        // ==========================================

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

        process.exit(0);


    } catch (error) {

        console.error(
            "Error while seeding publications:"
        );

        console.error(error);

        process.exit(1);
    }
};


seedDatabase();