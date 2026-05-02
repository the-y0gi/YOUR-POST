const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected ${connection.connection.host}`);
  } catch (error) {
    console.log("database connection error", error);
  }
};

module.exports = connectDB;
