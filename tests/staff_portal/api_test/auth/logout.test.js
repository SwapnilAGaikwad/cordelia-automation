// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Auth - logout', function(){
  this.timeout(20000);
  it('logout should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/auth/logout`,
        data: {
        "refreskToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmYjk4ZDM3LWU1NjAtNGZhZS1iZDg5LTg4YWY3NzRkMTQ2YyIsImVtYWlsIjoiYmhhc2thci5iQGNvcmRlbGlhY3J1aXNlcy5jb20iLCJmaXJzdF9uYW1lIjoiYmhhc2thciIsImxhc3RfbmFtZSI6ImJlaGwiLCJyb2xlSWQiOm51bGwsInJvbGUiOm51bGwsInNlc3Npb25JZCI6IkMwRk5OQklERUJTUUNPVk5YU0VRV1dMTTRBTERUMzgwIiwiaWF0IjoxNzMxNDg0Nzk2LCJleHAiOjE3MzE1Mjc5OTZ9.hiSA3mNCYhLSg_KrzVz4jlsv_UXN1VHFcbtrURQ0Cs8"
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