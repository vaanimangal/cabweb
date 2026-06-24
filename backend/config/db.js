// Inside config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const myUri = "mongodb://georidesAdmin:9876543210@ac-kdr4utd-shard-00-00.bx49doz.mongodb.net:27017,ac-kdr4utd-shard-00-01.bx49doz.mongodb.net:27017,ac-kdr4utd-shard-00-02.bx49doz.mongodb.net:27017/cabweb?ssl=true&replicaSet=atlas-9ed0uk-shard-0&authSource=admin&appName=Cluster0";
  
  try {
    await mongoose.connect(myUri);
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log("Connection failed:", err.message);
  }
};
module.exports = connectDB;