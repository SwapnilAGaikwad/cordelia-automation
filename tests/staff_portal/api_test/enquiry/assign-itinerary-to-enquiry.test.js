// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Enquiry - assign itinerary to enquiry', function(){
  this.timeout(20000);
  it('assign itinerary to enquiry should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/enquiry/c29c533d-014b-49fb-9b6d-d957637da33b/itinerary`,
        data: {
        "itineraryIds": [
                "e98ec1cd-4af5-4c89-837e-8651069ce4a9"
        ]
},
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