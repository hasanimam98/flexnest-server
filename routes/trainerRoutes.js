const express = require("express");
const router = express.Router();

const { getDB } = require("../config/db");


// Get all trainer applications
router.get("/", async (req, res) => {

  try {

    const db = getDB();

    const applications = await db
      .collection("trainerApplications")
      .find()
      .toArray();


    res.send(applications);

  } catch (error) {

    res.status(500).send({
      message: "Failed to get trainer applications",
      error: error.message
    });

  }

});



// Update trainer application status
router.patch("/:id", async (req, res) => {

  try {

    const { ObjectId } = require("mongodb");

    const db = getDB();

    const id = req.params.id;

    const { status } = req.body;


    const result = await db
      .collection("trainerApplications")
      .updateOne(
        {
          _id: new ObjectId(id)
        },
        {
          $set:{
            status: status
          }
        }
      );


    res.send(result);


  } catch(error){

    res.status(500).send({
      message:"Status update failed",
      error:error.message
    });

  }

});



module.exports = router;