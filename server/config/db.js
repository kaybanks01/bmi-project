const mongoose = require("mongoose");

require("dotenv").config();

const url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (err) {
    console.log("Error in connecting Database", err);
    process.exit(1);
  }
};

module.exports ={connectDB, conn:mongoose.connection};
