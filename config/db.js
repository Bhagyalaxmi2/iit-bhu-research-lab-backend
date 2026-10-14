
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Connect to MongoDB using MONGO_URI from .env
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
        console.log("MongoDB host:", mongoose.connection.host);
        console.log("MongoDB database:", mongoose.connection.name);
        console.log("MongoDB host:", mongoose.connection.host);
console.log("MongoDB port:", mongoose.connection.port);

        // Check available collections
        const collections = await mongoose.connection.db
            .listCollections()
            .toArray();

        console.log(
            "Collections:",
            collections.map((collection) => collection.name)
        );

        // Check document counts
        const peopleCount = await mongoose.connection.db
            .collection("people")
            .countDocuments();

        const publicationsCount = await mongoose.connection.db
            .collection("publications")
            .countDocuments();

        const researchCount = await mongoose.connection.db
            .collection("researches")
            .countDocuments();

        const supervisorCount = await mongoose.connection.db
            .collection("supervisors")
            .countDocuments();

        const contactCount = await mongoose.connection.db
            .collection("contacts")
            .countDocuments();

        console.log("People:", peopleCount);
        console.log("Publications:", publicationsCount);
        console.log("Research:", researchCount);
        console.log("Supervisors:", supervisorCount);
        console.log("Contacts:", contactCount);

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;