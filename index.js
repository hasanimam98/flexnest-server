require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");

const userRoutes = require("./routes/userRoutes");


const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.use("/users", userRoutes);



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