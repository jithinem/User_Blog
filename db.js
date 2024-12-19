const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/testDB";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); 
  }
};

module.exports = connectDB; 
