// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Auth - Validate access token', function(){
  this.timeout(20000);
  it('Validate access token should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/v1/auth/validate-token`,
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWM0NTE5LWU1MGUtNGMyZi1hNzE0LWFhNGE5NTg1ZGE0ZCIsImVtYWlsIjoibG9rZW5kcmEuc0Bjb3JkZWxpYWNydWlzZXMuY29tIiwiZmlyc3RfbmFtZSI6Imxva2VuZHJhIHNpbmdoICIsImxhc3RfbmFtZSI6ImhhZGEiLCJpYXQiOjE3MDg5MjY4NTgsImV4cCI6MTcwOTAxMzI1OH0.ib5raubqZuHUYZEKRPKWx9tf7CjU1KKZaWXLlBaYAoE"
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