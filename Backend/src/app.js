require('dotenv').config(); // Add this as FIRST line
// ... rest of your code
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
require("./utils/cronjob"); // Import cronjob to start scheduled tasks
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

// 🔥 TEST ROUTE - Place this BEFORE other routes
app.get("/test-email", async (req, res) => {
  try {
    console.log("🧪 Testing email sending...");
    const sendEmail = require("./utils/sendEmail.js");
    
    const result = await sendEmail.run(
      "Test Email - " + new Date().toISOString(),
      "This is a test email to check if SES is working."
    );
    
    console.log("📧 Email test result:", result);
    
    res.json({
      success: true,
      message: "Email test completed",
      result: result
    });
    
  } catch (error) {
    console.error("❌ Email test failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

// Import and use other routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", requestRouter);

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
      console.log("🧪 Test email endpoint available at: http://localhost:3000/test-email");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });