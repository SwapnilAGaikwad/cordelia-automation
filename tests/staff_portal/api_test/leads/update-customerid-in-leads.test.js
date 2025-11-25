// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Leads - update customerId in leads', function(){
  this.timeout(20000);
  it('update customerId in leads should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: 'https://api-staff.stage.cordeliacruises.com/v1/lead/update-customer-id',
        data: {
        "id": "542fc75b-0c24-4243-bab2-9b8fa3767c9f",
        "lead_created_time": "2025-02-19T02:14:26.093Z",
        "phone_number": "9372351291",
        "customer_id": "12345678"
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