require('dotenv').config();
const axios = require('axios');
const { getOtpFromEmail } = require('./fetchOtpFromEmail');

const BASE_URL = process.env.BASE_URL || 'https://api-staff.stage.cordeliacruises.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

/**
 * Login with OTP and set token in axios instance
 * @param {string} email - user email
 */
async function loginWithOtp(email) {
  // 1️⃣ Send OTP
  await api.post('/auth/send-otp', { email });
  console.log('OTP sent to email:', email);

  // 2️⃣ Get OTP from email
  const otp = await getOtpFromEmail();
  console.log('Fetched OTP:', otp);

  // 3️⃣ Login
  const res = await api.post('/auth/login', { email, otp });
  const token = res.data.token;

  // 4️⃣ Set token for future requests
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('Login successful! Token set in apiClient');

  return token;
}

/**
 * Helper API calls
 */
async function getOffers() {
  const res = await api.get('/cms/offers/portal?type=staff');
  return res.data;
}

async function getEnquiries(page = 1, limit = 15) {
  const res = await api.get(`/enquiry/staff?page=${page}&limit=${limit}`);
  return res.data;
}

async function getItineraries() {
  const res = await api.get('/cms/offers/itineraries');
  return res.data;
}

async function getStaff() {
  const res = await api.get('/staff');
  return res.data;
}

module.exports = {
  api,
  loginWithOtp,
  getOffers,
  getEnquiries,
  getItineraries,
  getStaff
};
