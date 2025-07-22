const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Error-handling middleware (placed at the end later)

// Signup route — POST /signup
app.post("/signup", async (req, res) => {
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

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// LOGIN ROUTE

app.post("/login", async (req, res) => {
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
      res.cookie("token", token, {
        httpOnly: true, // Optional: Makes cookie more secure
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  try {
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log("Sending a connection request");
  res.send("connection request sent")
});
// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
