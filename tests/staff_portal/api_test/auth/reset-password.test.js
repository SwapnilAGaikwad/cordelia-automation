// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Auth - reset-password', function(){
  this.timeout(20000);
  it('reset-password should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/v1/auth/reset-password`,
        data: {
        "token": "4ZLU22Q-R7VUVZQ-UBMOH4Q-CBYT4EY",
        "password": "Test@1234"
},
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWM0NTE5LWU1MGUtNGMyZi1hNzE0LWFhNGE5NTg1ZGE0ZCIsImVtYWlsIjoibG9rZW5kcmEuc0Bjb3JkZWxpYWNydWlzZXMuY29tIiwiaWF0IjoxNzA3OTEwMzM3LCJleHAiOjE3MDc5OTY3Mzd9.oUfDe6933L3SWsOapp9vpGTNKA03EeSUMPqc3xKNT5A"
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