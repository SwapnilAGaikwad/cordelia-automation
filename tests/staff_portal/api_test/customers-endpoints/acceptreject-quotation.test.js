// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Customer Endpoints - Accept/Reject Quotation', function(){
  this.timeout(20000);
  it('Accept/Reject Quotation should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/public/quotation/:status`,
        headers: {
        "x-access-token": "{{customerToken}}"
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