const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

// ✅ POST /signup — Create a user
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    const user = new User({ firstName, lastName, emailId, password });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

// ✅ GET /user — Find a user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error finding user: " + err.message);
  }
});

// ✅ DELETE /user — Delete user by ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found for deletion");
    }
    res.send(`User ${userId} deleted successfully`);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// ✅ PATCH /user — Update user by ID passed in body
app.patch("/user", async (req, res) => {
  const { userId, ...updateData } = req.body;

  if (!userId) {
    return res.status(400).send("userId is required");
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(updatedUser);
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
  }
});

// Placeholder route
app.get("/feed", (req, res) => {
  res.send("Feed route not implemented");
});

// ✅ Start server after DB connects
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });
