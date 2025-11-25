// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Bookings - booking list mobile', function(){
  this.timeout(20000);
  it('booking list mobile should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/booking/listMobile?visitor_id=79f58c2e-655f-4b43-b68c-255de4d78b85&trip_type=UPCOMING`,
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