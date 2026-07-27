const express = require("express");
const router = express.Router();

const { getDB } = require("../config/db");


router.post("/", async (req, res) => {

  try {

    const user = req.body;

    const db = getDB();


    const result = await db
      .collection("users")
      .insertOne(user);


    res.send({

      success: true,

      message: "User saved successfully",

      insertedId: result.insertedId

    });


  } catch(error) {

    res.status(500).send({

      success: false,

      message: error.message

    });

  }

});


module.exports = router;