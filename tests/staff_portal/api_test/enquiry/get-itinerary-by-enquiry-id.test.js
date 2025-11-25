// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Enquiry - get itinerary by enquiry id', function(){
  this.timeout(20000);
  it('get itinerary by enquiry id should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/enquiry/c29c533d-014b-49fb-9b6d-d957637da33b/itinerary_list`,
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