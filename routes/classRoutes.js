const express = require("express");
const router = express.Router();

const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");


// Create Class
router.post("/", async (req, res) => {

  try {

    const db = getDB();

    const classData = {
      ...req.body,
      createdAt: new Date()
    };


    const result = await db
      .collection("classes")
      .insertOne(classData);


    res.send(result);


  } catch(error){

    res.status(500).send({
      message:"Failed to create class",
      error:error.message
    });

  }

});



// Get classes by trainer email
router.get("/", async (req, res)=>{

  try {

    const db = getDB();

    const email = req.query.email;


    let query = {};

    if(email){
      query = {
        trainerEmail: email
      };
    }


    const result = await db
      .collection("classes")
      .find(query)
      .toArray();


    res.send(result);


  } catch(error){

    res.status(500).send({
      message:"Failed to get classes",
      error:error.message
    });

  }

});



// Update Class
router.patch("/:id", async(req,res)=>{

  try{

    const db = getDB();

    const id = req.params.id;


    const result = await db
      .collection("classes")
      .updateOne(
        {
          _id:new ObjectId(id)
        },
        {
          $set:req.body
        }
      );


    res.send(result);


  }catch(error){

    res.status(500).send({
      message:"Update failed",
      error:error.message
    });

  }

});



// Delete Class
router.delete("/:id", async(req,res)=>{

  try{

    const db = getDB();

    const id = req.params.id;


    const result = await db
      .collection("classes")
      .deleteOne({
        _id:new ObjectId(id)
      });


    res.send(result);


  }catch(error){

    res.status(500).send({
      message:"Delete failed",
      error:error.message
    });

  }

});


module.exports = router;