const mongoose = require('mongoose');

function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB...")
  } catch (error) {
    console.log("Connection Failed To MongoDB!", error)
  }
}


module.exports= connectToDB