// utils/fetchOtpFromEmail.js
require('dotenv').config();
const fs = require('fs');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD; // optional if IMAP enabled
const imapHost = process.env.IMAP_HOST; // optional if IMAP enabled
const imapPort = process.env.IMAP_PORT || 993;

async function getOtpFromEmail() {
  if (!email) {
    console.warn("⚠️ EMAIL not set in .env, using static OTP");
    return "123456";
  }

  // 1️⃣ Try IMAP fetch if config is present
  if (emailPassword && imapHost) {
    try {
      const config = {
        imap: {
          user: email,
          password: emailPassword,
          host: imapHost,
          port: imapPort,
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
          console.log("🔹 OTP fetched via IMAP:", otpMatch[0]);
          return otpMatch[0];
        }
      }

      await connection.end();
      console.warn("⚠️ IMAP fetch failed, OTP not found");
    } catch (err) {
      console.warn("⚠️ IMAP fetch failed:", err.message);
    }
  }

  // 2️⃣ Try parsing EML file if exists
  const emlPath = './latest_email_raw.eml';
  if (fs.existsSync(emlPath)) {
    try {
      const emlBuffer = fs.readFileSync(emlPath);
      const parsed = await simpleParser(emlBuffer);
      const otpMatch = parsed.text.match(/\b\d{6}\b/);
      if (otpMatch) {
        console.log("🔹 OTP fetched from EML:", otpMatch[0]);
        return otpMatch[0];
      }
    } catch (err) {
      console.warn("⚠️ EML fetch failed:", err.message);
    }
  }

  // 3️⃣ Fallback to static OTP for testing
  console.log("🔹 Using static OTP for testing");
  return "123456";
}

module.exports = { getOtpFromEmail };
