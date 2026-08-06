require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Stripe = require("stripe");

const { connectDB, getDB } = require("./config/db");


// Routes
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const postRoutes = require("./routes/postRoutes");
const classRoutes = require("./routes/classRoutes");


// Stripe Setup
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



const app = express();


// Middleware

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://studynook-client-psi.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



// Payment Collection

let paymentsCollection;



// API Routes

app.use("/auth", authRoutes);

app.use("/trainer-applications", trainerRoutes);

app.use("/users", userRoutes);

app.use("/bookings", bookingRoutes);

app.use("/posts", postRoutes);

app.use("/classes", classRoutes);





// Stripe Payment Intent Route

app.post("/create-payment-intent", async (req, res) => {

  try {

    const { price } = req.body;


    const amount = parseInt(price * 100);


    const paymentIntent = await stripe.paymentIntents.create({

      amount: amount,

      currency: "usd",

      payment_method_types: [
        "card"
      ],

    });


    res.send({

      clientSecret: paymentIntent.client_secret

    });


  } catch (error) {

    console.log(error);


    res.status(500).send({

      message: error.message

    });

  }

});






// Save Payment Information

app.post("/payments", async (req, res) => {

  try {


    const paymentInfo = req.body;


    const result = await paymentsCollection.insertOne(paymentInfo);


    res.send(result);


  } catch(error) {


    console.log(error);


    res.status(500).send({

      message: error.message

    });


  }

});







// Get User Payments

app.get("/payments/:email", async (req, res) => {

  try {


    const email = req.params.email;


    const result = await paymentsCollection
      .find({
        userEmail: email
      })
      .toArray();


    res.send(result);


  } catch(error) {


    console.log(error);


    res.status(500).send({

      message: error.message

    });


  }

});







// Test Route

app.get("/", (req, res) => {

  res.send("FlexNest Server Running");

});






// Server

const PORT = process.env.PORT || 5000;



connectDB()

.then(() => {


  const db = getDB();


  paymentsCollection = db.collection("payments");


  app.listen(PORT, () => {


    console.log(`Server running on port ${PORT}`);


  });


})


.catch((err)=>{


  console.log("Database connection failed:", err);


});