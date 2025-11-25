// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - apply coupon (NA)', function(){
  this.timeout(20000);
  it('apply coupon (NA) should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/public/apply-coupon`,
        data: {
        "quotationId": "7c829185-7b83-477e-90cd-c572ca3083d8",
        "coupon_code": "Bigsave10",
        "partial_payment": false
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