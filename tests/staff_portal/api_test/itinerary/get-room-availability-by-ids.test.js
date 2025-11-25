// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Itinerary - get room availability by ids', function(){
  this.timeout(20000);
  it('get room availability by ids should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/itinerary/rooms-availability?ids=5a088cb6-66c8-47ba-bff6-b2e9b330a9ff&preference=connecting_rooms,wheel_chair_access,balcony_view,square_window`,
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