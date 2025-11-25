// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - Get Payment Link', function(){
  this.timeout(20000);
  it('Get Payment Link should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/payment/generate-payment-link`,
        data: {
        "quotationId": "1555b994-2116-4309-8611-bc3b5030ea82",
        "paymentType": "partial_payment",
        "amount": 93000,
        "address": "jnksnks",
        "email": "bjbjbbKN@gmail.com",
        "fullName": "satyam",
        "isNri": false,
        "pan": "KKJKJKJKJK",
        "postalCode": "8989898",
        "phoneNumber": "9998989999",
        "tcsSlab": 5,
        "taxRegime": "OLD",
        "gstNumber": "jnjsnj",
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