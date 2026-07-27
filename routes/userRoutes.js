const express = require("express");

const router = express.Router();

const { getDB } = require("../config/db");



// Save User after Firebase Register

router.post("/", async (req,res)=>{


  try{


    const user = req.body;


    const db = getDB();



    const existingUser = await db
      .collection("users")
      .findOne({
        email:user.email
      });



    if(existingUser){

      return res.send({

        success:true,

        message:"User already exists"

      });

    }





    const newUser = {


      name:user.name,

      email:user.email,

      image:user.image || "",

      role:"user",

      status:"active",


    };




    const result = await db
      .collection("users")
      .insertOne(newUser);




    res.send({

      success:true,

      message:"User created successfully",

      insertedId:result.insertedId


    });



  }catch(error){


    res.status(500).send({

      success:false,

      message:error.message

    });


  }


});







// Get User by Email

router.get("/:email", async(req,res)=>{


  try{


    const email = req.params.email;


    const db = getDB();



    const user = await db
      .collection("users")
      .findOne({
        email
      });



    res.send(user);



  }catch(error){


    res.status(500).send({

      message:error.message

    });


  }


});




module.exports = router;