// utils/fetchOtpFromEmail.js

// Option 1: Fetch OTP from email (commented out)
/*
const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");

async function getOtpFromEmail() {
  // Your IMAP config
  const config = {
    imap: {
      user: "your_email@example.com",
      password: "your_password",
      host: "imap.example.com",
      port: 993,
      tls: true,
      authTimeout: 3000
    }
  };

  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  const searchCriteria = ['UNSEEN'];
  const fetchOptions = { bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)', 'TEXT'], markSeen: true };

  const messages = await connection.search(searchCriteria, fetchOptions);

  for (const message of messages) {
    const all = message.parts.find(part => part.which === 'TEXT');
    const parsed = await simpleParser(all.body);
    const otpMatch = parsed.text.match(/\b\d{6}\b/);
    if (otpMatch) {
      await connection.end();
      return otpMatch[0];
    }
  }

  await connection.end();
  throw new Error("OTP not found in email");
}
*/

// Option 2: Return static OTP (for testing)
async function getOtpFromEmail() {
  console.log("🔹 Returning static OTP for testing");
  return "123456";
}

module.exports = { getOtpFromEmail };
