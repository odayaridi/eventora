const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


require("dotenv").config();

const app = express();

app.use(express.json());

// Serve uploaded images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "public/uploads"))
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

// Global error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});