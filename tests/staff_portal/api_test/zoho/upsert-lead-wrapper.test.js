// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Zoho - Upsert Lead Wrapper', function(){
  this.timeout(20000);
  it('Upsert Lead Wrapper should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/external/zoho/upsert-lead`,
        data: {
        "data": [
                {
                        "Last_Name": "Lname",
                        "Phone": "8091776248",
                        "Unique_Lead_ID": "6ef989a0-4fc7-4ff7-aca0-8bc0af9afe2e",
                        "Created In LMS": "2025-07-17T13:33:50",
                        "Lead_Source": "Website",
                        "Lead_Type": "booking",
                        "Country_Code": "+91",
                        "Lead_Origin": "Domestic"
                }
        ],
        "trigger": [
                "workflow"
        ]
},
        headers: {
        "Authorization": ""
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