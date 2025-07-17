const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

// POST /signup — Create a user
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    const user = new User({ firstName, lastName, emailId, password });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

// GET /user — Find a user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user); // fixed from `users` to `user`
    }
  } catch (err) {
    res.status(400).send("Error finding user: " + err.message);
  }
});

// DELETE /user — Delete user by ID
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
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(updatedUser);
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
  }
});

app.get("/feed", (req, res) => {
  res.send("Feed route not implemented");
});

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
