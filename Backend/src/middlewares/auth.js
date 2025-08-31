const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    console.log("🔍 Auth middleware - cookies received:", req.cookies);
    
    const { token } = req.cookies;
    if (!token) {
      console.log("❌ No token found in cookies");
      return res.status(401).send("Please Login!");
    }
    
    console.log("🎫 Token found:", token.substring(0, 50) + "...");
    
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
    console.log("✅ Token decoded successfully:", decodedObj);
    
    const { _id } = decodedObj;
    console.log("🔍 Looking for user with ID:", _id);
    
    const user = await User.findById(_id);
    if (!user) {
      console.log("❌ User not found in database for ID:", _id);
      throw new Error("User not found");
    }
    
    console.log("✅ User found:", user.firstName, user.emailId);
    req.user = user;
    next();
  } catch (err) {
    console.log("❌ Auth middleware error:", err.message);
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};