const express=require('express');
// const app=express();
// const router=express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authRouter=express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
   const savedUser = await user.save();
    const token = await savedUser.getJWT();

// In your auth routes, update cookie settings:
res.cookie("token", token, {
  expires: new Date(Date.now() + 8 * 3600000),
  sameSite: 'lax',
  secure: false,
  // domain: 'localhost' // Add this
});

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // ✅ Generate the token
      const token = await user.getJWT();

      // ✅ Set cookie
  // Make both have httpOnly:
// In your auth routes, update cookie settings:
res.cookie("token", token, {
  expires: new Date(Date.now() + 8 * 3600000),
  sameSite: 'lax',
  secure: false,
  // domain: 'localhost' // Add this
});

      res.send(user);

    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{

        expires:new Date(Date.now()),

    });
    res.send("Logout Successful");
})



module.exports=authRouter;