const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      // ✅ Send email notification to the recipient
      if (status === "interested") {
        try {
          const emailSubject = `New Connection Request from ${req.user.firstName}`;
          const emailBody = `${req.user.firstName} ${req.user.lastName} is interested in connecting with you. Please check your ConnectDev account to review this request.`;
          
          // ✅ Fixed parameter order: recipient email first
          const emailRes = await sendEmail.run(toUser.emailId, emailSubject, emailBody);
          console.log("Email sent response: ", emailRes);
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          // Don't fail the request if email fails
        }
      }

      res.json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
        // ✅ Include recipient info for frontend updates
        recipient: {
          _id: toUser._id,
          firstName: toUser.firstName,
          emailId: toUser.emailId
        }
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", "firstName lastName emailId");

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      // ✅ Send email to the person who made the original request
      try {
        const emailSubject = `Connection Request ${status.charAt(0).toUpperCase() + status.slice(1)}`;
        const emailBody = `${loggedInUser.firstName} ${loggedInUser.lastName} has ${status} your connection request.`;
        
        // ✅ Send to the person who made the original request
        const emailRes = await sendEmail.run(
          connectionRequest.fromUserId.emailId, 
          emailSubject, 
          emailBody
        );
        console.log("Email sent response: ", emailRes);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }

      res.json({ 
        message: "Connection request " + status, 
        data,
        // ✅ Include updated request data for frontend
        updatedRequest: {
          _id: data._id,
          status: data.status,
          fromUserId: connectionRequest.fromUserId,
          toUserId: loggedInUser._id
        }
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

// ✅ Add route to get pending requests (for real-time updates)
requestRouter.get("/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender about skills photoUrl");

    res.json({ message: "Data fetched successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// ✅ Add route to get sent requests
requestRouter.get("/request/sent", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      fromUserId: loggedInUser._id,
    }).populate("toUserId", "firstName lastName age gender about skills photoUrl");

    res.json({ message: "Data fetched successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = requestRouter;