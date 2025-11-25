// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Manage Booking - reschdule-booking', function(){
  this.timeout(20000);
  it('reschdule-booking should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/public/reschedule-booking`,
        data: {
        "visitor_id": "1453be38-fb4e-4dd1-b743-e37e40f04b9a",
        "booking_id": "b0ed776e-cd19-4a86-a529-42b727280dbd",
        "itineraryId": "91812eb9-36ec-47ab-9235-0ac5df9543eb",
        "rooms": [
                {
                        "categoryId": "b5b34ecc-c021-44fd-a7eb-d74f533df1dc",
                        "bookingRoomId": "39e9127c-3bd9-4c50-b5fa-d2a4fc51ebae",
                        "selectedRoom": {
                                "id": "6d2f7692-dcc1-48e4-a334-8ed3ed81f0b3",
                                "room_number": "9610",
                                "beds": 3,
                                "itinerary_id": "91812eb9-36ec-47ab-9235-0ac5df9543eb",
                                "deck_no": "9"
                        }
                },
                {
                        "categoryId": "86e5812e-aa11-4931-b6b6-fad2bbe139af",
                        "bookingRoomId": "009c66aa-5af6-4325-bb0c-03209b850508",
                        "selectedRoom": {
                                "id": "6d2f7692-dcc1-48e4-a334-8ed3ed81f0b3",
                                "room_number": "9610",
                                "beds": 3,
                                "itinerary_id": "91812eb9-36ec-47ab-9235-0ac5df9543eb",
                                "deck_no": "9"
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