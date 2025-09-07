// cronjob.js

const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");
cron.schedule("15 13 * * *", async () => {
  // Send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      // Send Emails
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email,
          "There are so many friend requests pending, please login to DevTinder.in and accept or reject."
        );
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
