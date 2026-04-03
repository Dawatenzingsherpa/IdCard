const connectionToString = "mongodb://dawa:dawa@ac-f0i27d8-shard-00-00.r1kj3dr.mongodb.net:27017,ac-f0i27d8-shard-00-01.r1kj3dr.mongodb.net:27017,ac-f0i27d8-shard-00-02.r1kj3dr.mongodb.net:27017/?ssl=true&replicaSet=atlas-3zupf3-shard-0&authSource=admin&appName=Cluster0";

const mongoose = require("mongoose");





async function connectToDatabase(){
  await mongoose.connect(connectionToString);
  console.log("connected to database successfully");

}


module.exports = connectToDatabase;