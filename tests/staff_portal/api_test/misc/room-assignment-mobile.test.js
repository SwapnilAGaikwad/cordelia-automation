// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('misc - room assignment mobile', function(){
  this.timeout(20000);
  it('room assignment mobile should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/public/assign-rooms-mobile`,
        data: {
        "rooms": [
                {
                        "bookingRoomId": "55f188f7-bbc1-41f9-a4d2-57fcc7eeedc9",
                        "selectedRoomId": "da8a6d54-978f-4855-8dac-86f7bd570ee9"
                }
        ],
        "visitorId": "ca152da1-08f1-4732-9254-4949ea7c41ff",
        "bookingId": "5168b4d7-3199-4190-8182-fe7e3de4406e"
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