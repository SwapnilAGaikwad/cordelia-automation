// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('misc - Email logs', function(){
  this.timeout(20000);
  it('Email logs should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/public/email-logs?page=1&limit=10&emailFrom=no-reply@p2eppl.com&emailTo=rohini.b@cordeliacruises.com&fromDate=2024-08-01&toDate=2024-08-16&key=mai_2024`,
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