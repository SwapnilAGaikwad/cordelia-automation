// tests/staff_portal/module/staffFlow.test.js

require('dotenv').config();
const { expect } = require('chai');
const axios = require('axios');
const Imap = require('imap-simple');

// Load environment variables
const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;
const imapHost = process.env.IMAP_HOST || 'imap.gmail.com';
const imapPort = process.env.IMAP_PORT || 993;

if (!email || !password) {
  throw new Error("EMAIL_USER or EMAIL_PASS not set in .env");
}

// Axios instance with common headers (simulate browser)
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://staff.stage.cordeliacruises.com",
    "Referer": "https://staff.stage.cordeliacruises.com/",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
  },
  timeout: 30000,
});

// Helper function to fetch OTP from email
async function getOtpFromEmail(email, retries = 10, delay = 6000) {
  const config = {
    imap: {
      user: email,
      password: password,
      host: imapHost,
      port: imapPort,
      tls: true,
      authTimeout: 30000,
      tlsOptions: { rejectUnauthorized: false } // allows self-signed certificates
    }
  };

  let lastUid = 0;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await Imap.connect(config);
      await connection.openBox('INBOX');

      const searchCriteria = [['UNSEEN'], ['UID', `${lastUid + 1}:*`]];
      const fetchOptions = { bodies: ['TEXT'], markSeen: true };

      const messages = await connection.search(searchCriteria, fetchOptions);

      for (const message of messages) {
        const uid = message.attributes.uid;
        lastUid = Math.max(lastUid, uid);

        const body = message.parts.find(part => part.which === 'TEXT').body;
        const match = body.match(/<p><strong>OTP:\s*(\d{6})<\/strong><\/p>/i) || body.match(/\b\d{6}\b/);

        if (match) {
          await connection.end();
          return Number(match[1] || match[0]); // convert OTP to number
        }
      }

      await connection.end();
      console.log(`⚠ OTP not found, retrying ${attempt}/${retries}...`);
      await new Promise(res => setTimeout(res, delay));

    } catch (err) {
      console.error('❌ Error fetching OTP:', err.message);
      await new Promise(res => setTimeout(res, delay));
    }
  }

  throw new Error('OTP not received after maximum retries');
}

describe('Staff Portal Automation Flow', function () {
  this.timeout(60000); // 60s timeout

  let accessToken;

  it('should send OTP, login, and fetch staff profile', async function () {
    try {
      // 1️⃣ Send OTP
      console.log("🔹 Sending OTP to email:", email);
      const sendOtpResponse = await api.post('/auth/send-otp', { email });
      expect(sendOtpResponse.status).to.be.oneOf([200, 201]);
      console.log("✔ OTP request sent");

      // 2️⃣ Fetch OTP from email
      const otp = await getOtpFromEmail(email);
      console.log("🔹 OTP fetched:", otp, typeof otp);

      // 3️⃣ Login with OTP
      const loginResponse = await api.post('/auth/login', { email, otp });
      expect(loginResponse.status).to.equal(200);

      accessToken = loginResponse.data?.accessToken || loginResponse.data?.token;
      expect(accessToken).to.be.a('string');
      console.log("✔ Login successful, accessToken obtained");

      // 4️⃣ Set token for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // 5️⃣ Fetch staff profile
      const profileResponse = await api.get('/staff');
      expect(profileResponse.status).to.equal(200);
      console.log("✔ Staff profile fetched:", profileResponse.data);

      console.log("✅ Staff portal automation flow completed successfully!");

    } catch (err) {
      console.error("❌ Automation flow error:", err.response?.data || err.message);
      throw err; // fail test
    }
  });
});
