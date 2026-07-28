const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();


// Create JWT Token

router.post("/jwt", async (req, res) => {


  try {


    const user = req.body;


    const token = jwt.sign(

      user,

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );



    res.cookie(

      "token",

      token,

      {
        httpOnly:true,
        secure:false,
        sameSite:"lax"
      }

    );



    res.send({

      success:true,

      message:"Token created successfully"

    });



  }


  catch(error){


    res.status(500).send({

      success:false,

      message:error.message

    });


  }


});





// Logout

router.post("/logout",(req,res)=>{


  res.clearCookie("token");


  res.send({

    success:true,

    message:"Logout successful"

  });


});




module.exports = router;