// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - Generate Order (NA)', function(){
  this.timeout(20000);
  it('Generate Order (NA) should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/v1/payment/generate-order`,
        data: {
        "quotationId": "0a0133d1-2ac9-486e-903e-75c78a7ee611",
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