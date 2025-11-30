require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');
const store = require('./otpHelper');

async function sendOTP(email) {
  const payload = { email };
  const res = await axios.post(`${process.env.API_BASE_URL}/portal/auth/send-otp`, payload, {
    headers: {
      'sec-ch-ua-platform': '"macOS"',
      'Referer': 'https://staff.stage.cordeliacruises.com/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
      'Content-Type': 'application/json',
      'sec-ch-ua-mobile': '?0'
    }
  });
  expect(res.status).to.equal(200);
  console.log('✔ OTP sent to:', email);

  // Store email
  store.setEmail(email);

  return res.data;
}

module.exports = sendOTP;
