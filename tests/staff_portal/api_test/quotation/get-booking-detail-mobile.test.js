// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Quotation - Get booking detail mobile', function(){
  this.timeout(20000);
  it('Get booking detail mobile should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/booking/detail-mobile?visitor_id=b7fd42f1-49bf-4587-9e02-e704908125a3&id=cf8cda4c-eda6-4341-9474-0680a6adb488`,
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