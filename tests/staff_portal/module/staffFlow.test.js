// tests/staff_portal/module/staffFlow.test.js

require('dotenv').config();
const { expect } = require('chai');
const axios = require('axios');
const Imap = require('imap-simple');

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;
const imapHost = process.env.IMAP_HOST || 'imap.gmail.com';
const imapPort = process.env.IMAP_PORT || 993;

if (!email || !password) {
  throw new Error("EMAIL_USER or EMAIL_PASS not set in .env");
}

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Origin": "https://staff.stage.cordeliacruises.com",
    "Referer": "https://staff.stage.cordeliacruises.com/",
    "User-Agent": "Mozilla/5.0"
  },
  timeout: 30000,
});

// Helper to fetch OTP from email
async function getOtpFromEmail(email, retries = 10, delay = 6000) {
  const config = {
    imap: {
      user: email,
      password: password,
      host: imapHost,
      port: imapPort,
      tls: true,
      authTimeout: 30000,
      tlsOptions: { rejectUnauthorized: false },
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
          console.log(`🔹 OTP found: ${match[1] || match[0]}`);
          return match[1] || match[0];
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

describe('Staff Portal Automation Full Flow (ALL 26 STEPS)', function () {
  this.timeout(300000);

  let accessToken;

  it('should execute all steps 1 to 26', async function () {
    try {
      // 1️⃣ Send OTP
      console.log("🔹 Step 1: Sending OTP...");
      const sendOtpResponse = await api.post('/auth/send-otp', { email });
      console.log("🔸 Response Step 1:", sendOtpResponse.data);

      // 2️⃣ Fetch OTP
      console.log("🔹 Step 2: Fetching OTP...");
      const otp = await getOtpFromEmail(email);

      // 3️⃣ Login
      console.log("🔹 Step 3: Logging in...");
      const loginResponse = await api.post('/auth/login', { email, otp: Number(otp) });
      console.log("🔸 Response Step 3:", loginResponse.data);

      accessToken = loginResponse.data?.result?.token;
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // STATIC IDs
      const leadId = '75065977401101';
      const customerId = '1833cb09-c780-4a6e-816d-7190e487ac0b';
      const itineraryEnquiryId = 'e8a404e6-5a7e-4ee5-bec3-2adc0fe43245';

      // 4️⃣
      console.log("🔹 Step 4: Portal offers...");
      const step4 = await api.get('/cms/offers/portal?type=staff');
      console.log("🔸 Response Step 4:", step4.data);

      // 5️⃣
      console.log("🔹 Step 5: Staff enquiries...");
      const step5 = await api.get('/enquiry/staff?page=1&limit=15');
      console.log("🔸 Response Step 5:", step5.data);

      // 6️⃣
      console.log("🔹 Step 6: Itineraries list...");
      const step6 = await api.get('/cms/offers/itineraries');
      console.log("🔸 Response Step 6:", step6.data);

      // 7️⃣
      console.log("🔹 Step 7: Fetch lead...");
      const step7 = await api.get(`/lead/${leadId}`);
      console.log("🔸 Response Step 7:", step7.data);

      // 8️⃣
      console.log("🔹 Step 8: Customer enquiry...");
      const step8 = await api.get(`/enquiry/customer/${customerId}`);
      console.log("🔸 Response Step 8:", step8.data);

      // 9️⃣
      console.log("🔹 Step 9: Customer quotation...");
      const step9 = await api.get(`/quotation/customer/${customerId}`);
      console.log("🔸 Response Step 9:", step9.data);

      // 🔟
      console.log("🔹 Step 10: Common enquiry details...");
      const step10 = await api.get('/enquiry/common-details');
      console.log("🔸 Response Step 10:", step10.data);

      // 1️⃣1️⃣
      console.log("🔹 Step 11: Itinerary enquiry details...");
      const step11 = await api.get(`/itinerary/enquiry/${itineraryEnquiryId}`);
      console.log("🔸 Response Step 11:", step11.data);

      // 1️⃣2️⃣ Common data
    console.log("🔹 Step 12: Fetching Common Enquiry Data...");
    const step12 = await api.get('/enquiry/common');
    console.log("🔸 Response Step 12:", JSON.stringify(step12.data, null, 2));

    // 1️⃣3️⃣ Itinerary Filters
    console.log("🔹 Step 13: Fetching Itinerary Filters...");
    const step13 = await api.get('/enquiry/itinerary-filters');
    console.log("🔸 Response Step 13:", JSON.stringify(step13.data, null, 2));

    // 1️⃣4️⃣ Ship list
    console.log("🔹 Step 14: Fetching Ship List...");
    const step14 = await api.get('/ship');
    console.log("🔸 Response Step 14:", JSON.stringify(step14.data, null, 2));

    // 1️⃣5️⃣ Itinerary Search
    console.log("🔹 Step 15: Searching Itinerary (Jun–Jul 2026)...");
    const step15 = await api.get('/itinerary', {
    params: {
        start_date: '2026-06-01',
        end_date: '2026-07-31',
        ship_id: '1a261e73-9aad-4537-8098-7de99ba803ec',
        nightCount: 3,
        page: 1,
        limit: 500
    }
    });
    console.log("🔸 Response Step 15:", JSON.stringify(step15.data, null, 2));


      // 1️⃣6️⃣
      console.log("🔹 Step 16: Itinerary filters...");
      const step16 = await api.get('/itinerary/filters');
      console.log("🔸 Response Step 16:", step16.data);

      // 1️⃣7️⃣
      console.log("🔹 Step 17: Itinerary preview...");
      const step17 = await api.get(`/itinerary/preview/${itineraryEnquiryId}`);
      console.log("🔸 Response Step 17:", step17.data);

      // 1️⃣8️⃣
      console.log("🔹 Step 18: Itinerary enquiry...");
      const step18 = await api.get(`/itinerary/enquiry/${itineraryEnquiryId}`);
      console.log("🔸 Response Step 18:", step18.data);

      // 1️⃣9️⃣
      console.log("🔹 Step 19: Send enquiry...");
      const step19 = await api.post(`/enquiry/${itineraryEnquiryId}/send`, { customerId });
      console.log("🔸 Response Step 19:", step19.data);

      // 2️⃣0️⃣
      console.log("🔹 Step 20: Itinerary enquiry refresh...");
      const step20 = await api.get(`/itinerary/enquiry/${itineraryEnquiryId}`);
      console.log("🔸 Response Step 20:", step20.data);

      // 2️⃣1️⃣
      console.log("🔹 Step 21: Special requests...");
      const step21 = await api.post(`/enquiry/${itineraryEnquiryId}/special-requests`, {
        requests: ["Vegetarian meal", "Window seat"]
      });
      console.log("🔸 Response Step 21:", step21.data);

      // 2️⃣2️⃣
      console.log("🔹 Step 22: Itinerary enquiry refresh...");
      const step22 = await api.get(`/itinerary/enquiry/${itineraryEnquiryId}`);
      console.log("🔸 Response Step 22:", step22.data);

      // 2️⃣3️⃣
      console.log("🔹 Step 23: Common options again...");
      const step23 = await api.get('/enquiry/common-options');
      console.log("🔸 Response Step 23:", step23.data);

      // 2️⃣4️⃣
      console.log("🔹 Step 24: Rooms availability...");
      const step24 = await api.get(`/rooms/availability?shipId=1a261e73-9aad-4537-8098-7de99ba803ec`);
      console.log("🔸 Response Step 24:", step24.data);

      // 2️⃣5️⃣
      console.log("🔹 Step 25: Room pricing...");
      const step25 = await api.get(`/quotation/room-pricing?shipId=1a261e73-9aad-4537-8098-7de99ba803ec`);
      console.log("🔸 Response Step 25:", step25.data);

      // 2️⃣6️⃣
      console.log("🔹 Step 26: Final quotation...");
      const step26 = await api.get(`/quotation/${customerId}`);
      console.log("🔸 Response Step 26:", step26.data);

      console.log("✅ ALL 26 STEPS COMPLETED SUCCESSFULLY");

    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      throw err;
    }
  });

});
