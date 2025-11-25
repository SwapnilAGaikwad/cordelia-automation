// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Manage Booking - add-guests', function(){
  this.timeout(20000);
  it('add-guests should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/public/add-guests`,
        data: {
        "bookingId": "3984c2a4-cc5f-4a97-a16f-7fe775234459",
        "data": [
                {
                        "bookingRoomId": "bdc62eaa-f02b-4c80-b3a5-f0f7b92e27ba",
                        "guests": {
                                "adults": 1,
                                "children": 0,
                                "infants": 0
                        },
                        "guestDetails": [
                                {
                                        "firstName": "John",
                                        "lastName": "Doe",
                                        "mobile": "1234567890",
                                        "email": "john.doe@example.com",
                                        "gender": "male",
                                        "dateOfBirth": "1990-01-01",
                                        "mealType": "veg",
                                        "address": "123 Main St",
                                        "citizenship": "Indian",
                                        "state": "Maharashtra",
                                        "city": "Mumbai",
                                        "country": "India",
                                        "guestType": "ADULT"
                                }
                        ]
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