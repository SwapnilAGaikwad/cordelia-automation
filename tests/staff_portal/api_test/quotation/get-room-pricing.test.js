// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Quotation - get room pricing', function(){
  this.timeout(20000);
  it('get room pricing should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/quotation/room-pricing`,
        data: {
        "itinerary_id": "21f9e1d4-4dcd-4185-bb3b-e89d85e662b9",
        "rooms": [
                {
                        "categoryId": "b5b34ecc-c021-44fd-a7eb-d74f533df1dc",
                        "guests": {
                                "adults": 2,
                                "children": 0,
                                "infants": 0
                        }
                }
        ],
        "special_request_ids": [],
        "special_pricing": true,
        "upgrade_offer": false
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