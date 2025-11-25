// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Quotation - details', function(){
  this.timeout(20000);
  it('details should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/quotation/b7f480ac-1515-464c-b051-ee52e4c4e385/details`,
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