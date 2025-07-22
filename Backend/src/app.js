const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Error-handling middleware (placed at the end later)

// Signup route — POST /signup
app.post("/signup", async (req, res) => {
  //   Creating a new instance of the User model

  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// Get user by email — GET /user
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Get all users — GET /feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Dummy route — GET /getUserData
app.get("/getUserData", (req, res) => {
  res.send("Simulated user data response");
});

// Global error-handling middleware (must come after all routes)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).send("Something went wrong");
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
