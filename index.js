require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const postRoutes = require("./routes/postRoutes");


const app = express();


app.use(cors({
  origin:"http://localhost:3001",
  credentials:true
}));
app.use("/trainer-applications", trainerRoutes);

app.use(express.json());

app.use(cookieParser());



// Routes
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);

app.use("/posts", postRoutes);




app.get("/", (req, res) => {

  res.send("FlexNest Server Running");

});




const PORT = process.env.PORT || 5000;



connectDB()

.then(()=>{


  app.listen(PORT, ()=>{


    console.log(`Server running on port ${PORT}`);


  });


});