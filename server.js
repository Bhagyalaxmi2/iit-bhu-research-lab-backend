const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");

const personRoutes = require("./routes/personRoutes");
const researchRoutes = require("./routes/researchRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const contactRoute = require("./routes/contactRoute");
const supervisorRoutes = require("./routes/supervisorRoutes");
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Person routes
app.use("/api/people", personRoutes);

// Research routes
app.use("/api/research", researchRoutes);

// Publication routes
app.use("/api/publications", publicationRoutes);

app.use("/api/contact", contactRoute);
app.use("/api/supervisor", supervisorRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Hello, Research World!.. Research Lab API Running...");
});

// Port
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});