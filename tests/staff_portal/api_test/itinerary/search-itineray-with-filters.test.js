// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Itinerary - search itineray with filters', function(){
  this.timeout(20000);
  it('search itineray with filters should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/itinerary?start_date=2024-08-01&end_date=2024-09-30&origin_port_id=30da7ef8-7526-4e15-821e-ac7e2e88f923&destination_port_id=1fb63936-8bd8-4fda-9151-329855b03413&trip_type=one_way&ship_id=1a261e73-9aad-4537-8098-7de99ba803ec&nightCount=2%2C3%2C4%2C5%2C7%2C9%2C12&page=1&limit=500`,
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