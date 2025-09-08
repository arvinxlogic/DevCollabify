const { SESClient } = require("@aws-sdk/client-ses");

const REGION = "eu-north-1"; // ✅ Keep your correct region

console.log("🔍 Environment variable check:");
console.log("🔑 AWS_ACCESS_KEY exists:", !!process.env.AWS_ACCESS_KEY);
console.log("🔑 AWS_SES_SECRET exists:", !!process.env.AWS_SES_SECRET); // ✅ Match your .env

if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SES_SECRET) {
    console.error("❌ MISSING AWS CREDENTIALS in environment variables!");
    console.error("   Make sure your .env file has AWS_ACCESS_KEY and AWS_SES_SECRET");
    throw new Error("AWS credentials not found in environment variables");
}

const sesClient = new SESClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET, // ✅ Match your .env
    },
});

console.log("🌍 SES Client configured for region:", REGION);
console.log("✅ Using environment variables for AWS credentials");

module.exports = { sesClient };