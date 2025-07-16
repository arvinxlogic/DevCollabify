const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose
    .connect(
"mongodb+srv://arvindsinghq05:ApCktBzIiZOvpe4U@dev.uisfibz.mongodb.net/?retryWrites=true&w=majority&appName=Dev"    )
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
};

module.exports = connectDB;
