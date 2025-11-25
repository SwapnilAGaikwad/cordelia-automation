// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Auth - Forgot Password', function(){
  this.timeout(20000);
  it('Forgot Password should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/v1/auth/forgot-password`,
        data: {
        "email": "saurav@yopmail.com"
},
        headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5ZDc4MTg1LWFhMWYtNDM3Ny1hZGUzLTY3OGY0ZDU1OGFiOSIsImVtYWlsIjoicG9vamEuY2hvbmthckBjb3JkZWxpYWNydWlzZXMuY29tIiwiaWF0IjoxNzA3OTA4MjgzLCJleHAiOjE3MDc5MDk0ODN9.B7ahsLaoAWkQ5LhW9DPhWI_9vi0W_xb49mFgbqSe4xY"
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