require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const postRoutes = require("./routes/postRoutes");


const app = express();


// Middleware
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());


// API Routes

app.use("/auth", authRoutes);

app.use("/trainer-applications", trainerRoutes);

app.use("/users", userRoutes);

app.use("/bookings", bookingRoutes);

app.use("/posts", postRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("FlexNest Server Running");
});


// Server
const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((err)=>{
  console.log("Database connection failed:", err);
});