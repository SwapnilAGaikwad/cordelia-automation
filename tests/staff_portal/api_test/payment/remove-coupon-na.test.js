// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - remove coupon (NA)', function(){
  this.timeout(20000);
  it('remove coupon (NA) should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/public/remove-coupon/d4b131d5-fe52-4126-9d31-f17be7c9bc51`,
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