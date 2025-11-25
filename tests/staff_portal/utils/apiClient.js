require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'https://api-pro.stage.cordeliacruises.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// attach token from env if present
if (process.env.ACCESS_TOKEN) {
  api.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;
}

module.exports = api;
