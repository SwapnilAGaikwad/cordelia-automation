// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Manage Booking - Add cabin', function(){
  this.timeout(20000);
  it('Add cabin should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/public/add-rooms`,
        data: {
        "id": "b07bbeb0-4547-4cc0-af4f-11f563693ade",
        "visitor_id": "1453be38-fb4e-4dd1-b743-e37e40f04b9a",
        "rooms": [
                {
                        "categoryId": "86e5812e-aa11-4931-b6b6-fad2bbe139af",
                        "guests": {
                                "adults": 2,
                                "children": 0,
                                "infants": 0
                        }
                },
                {
                        "categoryId": "b26e91aa-e4aa-4047-b54b-388458767abc",
                        "guests": {
                                "adults": 2,
                                "children": 0,
                                "infants": 0
                        }
                }
        ]
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