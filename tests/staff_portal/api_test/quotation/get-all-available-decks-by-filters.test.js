// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Quotation - get all available decks by filters', function(){
  this.timeout(20000);
  it('get all available decks by filters should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/quotation/decks?itinerary_id=5a088cb6-66c8-47ba-bff6-b2e9b330a9ff&category_id=86e5812e-aa11-4931-b6b6-fad2bbe139af&guest=0`,
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