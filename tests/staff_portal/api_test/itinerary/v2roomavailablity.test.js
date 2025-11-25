// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Itinerary - v2/roomavailablity', function(){
  this.timeout(20000);
  it('v2/roomavailablity should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/itinerary/v2/rooms-availability?ids=c723b76c-d772-4604-83a6-09b2c72d1292,8313da69-43cd-4d88-a549-8335291afdb7,fa65dc75-04b3-4af1-a61c-78a52c6f7bd4`,
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