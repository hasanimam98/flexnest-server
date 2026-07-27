const express = require("express");

const router = express.Router();

const { getDB } = require("../config/db");



// Create Post

router.post("/", async (req, res) => {

  try {


    const post = req.body;


    const db = getDB();


    const result = await db
      .collection("posts")
      .insertOne(post);



    res.send({

      success: true,

      message: "Post created successfully",

      insertedId: result.insertedId

    });



  } catch(error) {


    res.status(500).send({

      success:false,

      message:error.message

    });


  }

});





// Get All Posts

router.get("/", async(req,res)=>{


  try{


    const db = getDB();


    const posts = await db
      .collection("posts")
      .find()
      .sort({
        _id:-1
      })
      .toArray();



    res.send(posts);



  }catch(error){


    res.status(500).send({

      success:false,

      message:error.message

    });


  }


});



module.exports = router;