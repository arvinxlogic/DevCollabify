require('dotenv').config(); // Add this as FIRST line
// ... rest of your code
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http=require('http');

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
    
    // ✅ Fixed parameter order: recipient, subject, body
    const result = await sendEmail.run(
      "arvindsinghq05@gmail.com", // recipient email
      "Test Email - " + new Date().toISOString(), // subject
      "This is a test email to check if SES is working." // body
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
const paymentRouter = require('./routes/payment.js');
const initializeSocket = require('./utils/socket.js');
const chatRouter = require('./routes/chat.js');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use('/', paymentRouter)
app.use("/", requestRouter);
app.use('/',chatRouter)

const server=http.createServer(app);
initializeSocket(server);
// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
      console.log("🧪 Test email endpoint available at: http://localhost:3000/test-email");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });