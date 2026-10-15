const express = require("express");
const MongoStore=  require("connect-mongo");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");

const personRoutes = require("./routes/personRoutes");
const researchRoutes = require("./routes/researchRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const contactRoute = require("./routes/contactRoute");
const supervisorRoutes = require("./routes/supervisorRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Connect MongoDB
connectDB();

// Middleware
const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    return callback(null, !origin || allowedOrigins.includes(origin));
  },
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
