// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Customer Endpoints - Apply Coupon', function(){
  this.timeout(20000);
  it('Apply Coupon should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/public/apply-coupon`,
        data: {
        "quotationId": "565b2ac5-9b89-4f7c-a07c-ff73512006ad",
        "coupon_code": "Bigsave10",
        "partial_payment": false
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