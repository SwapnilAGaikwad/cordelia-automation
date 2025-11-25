// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Customer Endpoints - Generate Order', function(){
  this.timeout(20000);
  it('Generate Order should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: '{{API_BASE_URL}}/v1/payment/generate-order',
        data: {
        "quotationId": "565b2ac5-9b89-4f7c-a07c-ff73512006ad",
        "paymentType": "full_payment",
        "amount": 1000000,
        "address": "jnksnks",
        "email": "bjbjbbKN@gmail.com",
        "fullName": "Test2",
        "isNri": true,
        "pan": "KKJKJKJsatyaKJK",
        "postalCode": "8989898",
        "phoneNumber": "9998989999",
        "tcsSlab": 5,
        "taxRegime": "OLD",
        "gstName": "AHKM"
},
        headers: {
        "x-access-token": "{{customerToken}}"
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