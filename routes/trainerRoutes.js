const express = require("express");

const router = express.Router();

const { getDB } = require("../config/db");

router.post("/", async (req, res) => {

  try {

    const application = req.body;

    const db = getDB();

    const existing = await db
      .collection("trainerApplications")
      .findOne({
        email: application.email
      });

    if (existing) {
      return res.send({
        success: false,
        message: "You have already applied."
      });
    }

    const result = await db
      .collection("trainerApplications")
      .insertOne(application);

    res.send({
      success: true,
      insertedId: result.insertedId
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;