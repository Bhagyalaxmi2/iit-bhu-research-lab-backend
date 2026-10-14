const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const seedAdmin = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI, {
    dbName: "labwebpage",
});

        console.log("MongoDB connected");
        console.log("Database:", mongoose.connection.name);

        const username = "admin";
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            throw new Error("ADMIN_PASSWORD is missing in .env");
        }

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log("Admin already exists");
            console.log("Admin ID:", existingAdmin._id);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.create({
            username,
            password: hashedPassword,
        });

        console.log("Admin created successfully");

    } catch (error) {
        console.error("Admin seed error:", error.message);

    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
};

seedAdmin();