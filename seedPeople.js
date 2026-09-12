const fs = require("fs");
const path = require("path");
const vm = require("vm");

const mongoose = require("mongoose");
require("dotenv").config();

const Person = require("./models/Person");

// =====================================================
// 1. PATH TO PEOPLE DATA
// =====================================================

const filePath = path.join(
    __dirname,
    "../LabWebpage/src/components/People/peopledata.js"
);

console.log("Reading people data from:");
console.log(filePath);

// =====================================================
// 2. READ peopledata.js
// =====================================================

let fileContent = fs.readFileSync(
    filePath,
    "utf8"
);

// =====================================================
// 3. REMOVE / CONVERT ES MODULE EXPORTS
// =====================================================

// Convert:
// export const phdScholars = ...
// into:
// const phdScholars = ...

fileContent = fileContent
    .replace(/export const phdScholars\s*=\s*/, "const phdScholars = ")
    .replace(/export const mtechStudents\s*=\s*/, "const mtechStudents = ")
    .replace(/export const alumni\s*=\s*/, "const alumni = ")
    .replace(/export const peopleData\s*=\s*/, "const peopleData = ");

// =====================================================
// 4. EXECUTE THE DATA FILE
// =====================================================

const sandbox = {};

vm.createContext(sandbox);

vm.runInContext(
    `
    ${fileContent}

    this.peopleData = peopleData;
    `,
    sandbox
);

const allPeople = sandbox.peopleData;

console.log(
    `Found ${allPeople.length} people`
);

// =====================================================
// 5. FORMAT DATA FOR MONGODB
// =====================================================

const formattedPeople = allPeople.map((person) => {

    // -----------------------------------------------
    // Normalize category
    // -----------------------------------------------

    let category = String(
        person.category || ""
    )
        .toLowerCase()
        .trim();

    if (
        category === "phd" ||
        category === "phd scholar"
    ) {
        category = "phd";
    }

    else if (
        category === "mtech" ||
        category === "m.tech" ||
        category === "m.tech student"
    ) {
        category = "mtech";
    }

    else if (
        category === "alumni"
    ) {
        category = "alumni";
    }

    // -----------------------------------------------
    // Return MongoDB document
    // -----------------------------------------------

    return {
        name: person.name || "",

        category: category,

        image: person.image || "",

        designation:
            person.designation || "",

        position:
            person.position || "",

        researchArea:
            person.researchArea || "",

        enrollment:
            person.enrollment || "",

        fellowship:
            person.fellowship || "",

        email:
            person.email || "",

        year:
            person.year || "",

        currentPosition:
            person.currentPosition || ""
    };
});

// =====================================================
// 6. SHOW CATEGORIES
// =====================================================

console.log(
    "Categories found:",
    [
        ...new Set(
            formattedPeople.map(
                (person) => person.category
            )
        )
    ]
);

// =====================================================
// 7. SEED DATABASE
// =====================================================

const seedDatabase = async () => {

    try {

        // -------------------------------------------
        // Connect MongoDB
        // -------------------------------------------

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected successfully"
        );

        // -------------------------------------------
        // Remove old people
        // -------------------------------------------

        await Person.deleteMany({});

        console.log(
            "Old people removed"
        );

        // -------------------------------------------
        // Insert new people
        // -------------------------------------------

        await Person.insertMany(
            formattedPeople
        );

        console.log(
            "All people inserted successfully!"
        );

        console.log(
            `Total inserted: ${formattedPeople.length}`
        );

        // -------------------------------------------
        // Close MongoDB connection
        // -------------------------------------------

        await mongoose.connection.close();

        console.log(
            "MongoDB connection closed"
        );

        process.exit(0);

    }

    catch (error) {

        console.error(
            "Error while seeding people:"
        );

        console.error(error);

        process.exit(1);
    }
};

// =====================================================
// 8. RUN SEED
// =====================================================

seedDatabase();