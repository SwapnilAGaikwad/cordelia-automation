// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Customer - update customer by id', function(){
  this.timeout(20000);
  it('update customer by id should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/v1/customer/bf1b0197-cbfe-4d5a-adda-5d73dffa1b0c`,
        data: {
        "firstName": "John",
        "lastName": "Doe",
        "isActive": true
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