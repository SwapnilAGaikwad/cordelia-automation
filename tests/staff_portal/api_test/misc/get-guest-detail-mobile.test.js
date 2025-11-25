// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('misc - Get guest detail mobile', function(){
  this.timeout(20000);
  it('Get guest detail mobile should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/public/guest-detail-mobile?visitor_id=80f2ced8-26ad-4a4d-b697-89f2c8f84171&id=adcf2d44-0622-4bd3-862e-22936d76939c`,
        headers: {
        "Authorization": "Bearer {{accessToken}}"
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