const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;


const connectDB = async () => {

  try {

    await client.connect();

    db = client.db("flexnest");

    console.log("MongoDB Connected Successfully");


  } catch(error) {

    console.log(error.message);

  }

};

const getDB = () => {

  return db;

};



module.exports = {
  connectDB,
  getDB
};