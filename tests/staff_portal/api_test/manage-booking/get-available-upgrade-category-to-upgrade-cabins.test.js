// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Manage Booking - get available upgrade category to upgrade cabins', function(){
  this.timeout(20000);
  it('get available upgrade category to upgrade cabins should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/public/get-available-category?id=ebcb3638-ac65-4263-9c4d-d7718223260e&visitor_id=1453be38-fb4e-4dd1-b743-e37e40f04b9a&upgradeFromId=2c39eafe-3b58-403e-8421-b1528f7cd12e`,
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