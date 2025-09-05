const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose
    .connect(
      process.env.DB_CONNECTION_SECRET, )
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
};

module.exports = connectDB;
