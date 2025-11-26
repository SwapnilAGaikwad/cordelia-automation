// tests/staff_portal/module/staffFlow.test.js

require('dotenv').config(); // load .env
const { expect } = require('chai');
const api = require('../utils/apiClient');
const { getOtpFromEmail } = require('../utils/fetchOtpFromEmail');

// Load email from .env
const email = process.env.EMAIL_USER;

// Validate email is set
if (!email) {
  throw new Error("EMAIL_USER not set in .env");
}

console.log("🔹 Using email:", email);

describe('Staff Portal Automation Flow', function () {
  this.timeout(30000); // 30s timeout for API calls

  let accessToken;

  it('should login and fetch staff APIs', async function () {
    try {
      // 1️⃣ Send OTP
      const sendOtpResponse = await api.post('/auth/send-otp', { email });
      expect(sendOtpResponse.status).to.equal(200);
      console.log("🔹 OTP request sent");

      // 2️⃣ Fetch OTP (currently static)
      const otp = await getOtpFromEmail(email);
      console.log("🔹 OTP fetched:", otp);

      // 3️⃣ Login with OTP
      const loginResponse = await api.post('/auth/login', { email, otp });
      expect(loginResponse.status).to.equal(200);
      accessToken = loginResponse.data?.accessToken;
      expect(accessToken).to.be.a('string');
      console.log("🔹 Login successful, accessToken obtained");

      // 4️⃣ Set token in API client for further requests
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // 5️⃣ Example API call: fetch staff profile
      const profileResponse = await api.get('/staff');
      expect(profileResponse.status).to.equal(200);
      console.log("🔹 Staff profile fetched:", profileResponse.data);

    } catch (err) {
      console.error("❌ Error in automation flow:", err.message);
      throw err; // fail the test
    }
  });
});
