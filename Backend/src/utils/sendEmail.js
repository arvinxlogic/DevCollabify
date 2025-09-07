const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <body>
                <h2>${subject}</h2>
                <p>${body}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">
                  This email was sent from ConnectDev Platform
                </p>
              </body>
            </html>
          `,
        },
        Text: {
          Charset: "UTF-8",
          Data: `${subject}\n\n${body}\n\n---\nThis email was sent from ConnectDev Platform`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject || "ConnectDev Notification",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (subject = "Connection Request Update", toEmailId,body = "Your connection request has been updated") => {
  console.log("📧 Sending email:", subject);
  
  const sendEmailCommand = createSendEmailCommand(
    "arvindsinghq05@gmail.com",     // TO: Your verified email (for testing)
    "arvind@connectdev.online",     // FROM: Your verified domain
    subject,
    body
  );

  try {
    const result = await sesClient.send(sendEmailCommand);
    console.log("✅ Email sent successfully! Message ID:", result.MessageId);
    return { success: true, messageId: result.MessageId };
  } catch (caught) {
    console.error("❌ Email sending failed:", caught.message);
    return { success: false, error: caught.message };
  }
};

module.exports = { run };