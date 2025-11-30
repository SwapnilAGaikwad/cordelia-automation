require('dotenv').config();
const axios = require('axios');
const { getOtpFromEmail } = require('./fetchOtpFromEmail');

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

async function loginWithOtp(email) {
  // Send OTP
  await api.post('/auth/send-otp', { email });
  console.log('🔹 OTP sent to email:', email);

  // Fetch OTP from email
  const otp = await getOtpFromEmail(email);
  console.log('🔹 OTP fetched:', otp);

  // Login
  const res = await api.post('/auth/login', { email, otp });
  const token = res.data.accessToken || res.data.token;

  // Set token for future requests
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('🔹 Login successful, token set');

  return token;
}

// Example helper API calls
async function getStaff() {
  const res = await api.get('/staff');
  return res.data;
}

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

module.exports = {
  api,
  loginWithOtp,
  getStaff,
  getOffers,
  getEnquiries,
  getItineraries
};
