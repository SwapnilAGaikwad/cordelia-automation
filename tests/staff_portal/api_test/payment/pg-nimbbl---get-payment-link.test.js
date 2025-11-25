// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - PG Nimbbl - Get Payment Link', function(){
  this.timeout(20000);
  it('PG Nimbbl - Get Payment Link should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: 'https://erp.nimbbl.tech/api/v2/payment-links/create-one',
        data: {
        "payer_email_address": "marvel_dc@yopmail.com",
        "payer_first_name": "Marvel",
        "payer_last_name": "DC",
        "payer_mobile_number": 7838926135,
        "currency": "INR",
        "total_amount": 134694.6,
        "invoice_id": "c94faf8a-1fc1-47ca-b818-d5407b88008f",
        "expires_at": "2024-05-08 09:10:55",
        "generate_only": true,
        "notification_channel_email": false,
        "notification_channel_sms": false,
        "callback_url": "http://localhost:3000/payment-status/c94faf8a-1fc1-47ca-b818-d5407b88008f",
        "sms_template_name": "PayLink Payment",
        "email_template_name": "Payment Links Payment"
},
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDg4Miwic3ViX21lcmNoYW50X2lkIjoyODYwNSwiZXhwIjoxNzE1MDY0NDM5LCJ0eXBlIjoibWVyY2hhbnQiLCJpYXQiOjE3MTUwNjMyMzksImlzcyI6InVybjpuaW1iYmwiLCJ0b2tlbl90eXBlIjoidHJhbnNhY3Rpb24ifQ.lPRbvljvQJvK_EMo8BTqn-7DupAKt9xtj4E6BmJCvE8",
        "Accept": "application/json",
        "Content-Type": "application/json"
},
      });
      // basic assertions
      expect(res).to.have.property('status');
      expect([200,201,202]).to.include(res.status);
      expect(res.data).to.exist;
    } catch (err) {
      // make test fail with useful message
      throw new Error('Request failed: ' + (err.response ? JSON.stringify(err.response.data) : err.message));
    }
  });
});