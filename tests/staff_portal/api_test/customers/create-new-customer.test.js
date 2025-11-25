// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Customer - create new customer', function(){
  this.timeout(20000);
  it('create new customer should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/v1/customer/create`,
        data: {
        "firstName": "Johnw",
        "lastName": "Doe",
        "email": "john.dose@example.com",
        "phoneNumber": "1234567890",
        "whatsappNumber": "9876543110"
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