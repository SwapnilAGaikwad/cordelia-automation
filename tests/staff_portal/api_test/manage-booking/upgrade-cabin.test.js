// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Manage Booking - upgrade cabin', function(){
  this.timeout(20000);
  it('upgrade cabin should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/public/upgrade-cabin`,
        data: {
        "booking_id": "6c4a5f65-3bcd-4b53-a8d7-b228943fe61c",
        "visitor_id": "80f2ced8-26ad-4a4d-b697-89f2c8f84171",
        "rooms": [
                {
                        "categoryId": "2c39eafe-3b58-403e-8421-b1528f7cd12e",
                        "bookingRoomId": "877e2cae-4ff5-48b9-ae47-3adab960b848",
                        "guests": {
                                "adults": 2,
                                "children": 0,
                                "infants": 0
                        },
                        "selectedRoom": {
                                "id": "6d2f7692-dcc1-48e4-a334-8ed3ed81f0b3",
                                "room_number": "9610",
                                "beds": 2,
                                "itinerary_id": "5109efd0-90b4-4c76-be93-466ba5d58f7f",
                                "deck_no": "9"
                        }
                }
        ],
        "guestDetails": [
                {
                        "guestId": "1",
                        "guestType": "ADULT",
                        "firstName": "John",
                        "lastName": "Doe",
                        "mobile": "9504583",
                        "email": "john.doe@example.com",
                        "gender": "Male",
                        "dateOfBirth": "1999/12/12",
                        "mealType": "Non-Veg",
                        "passportNumber": "c1945678",
                        "passportIssueDate": "2022/12/12",
                        "passportExpiryDate": "2036/12/12",
                        "address": "Hinoo, Doranda",
                        "state": "Jharkhand",
                        "city": "Ranchi",
                        "country": "India",
                        "citizenship": "Indian"
                },
                {
                        "guestId": "2",
                        "guestType": "ADULT",
                        "firstName": "John2",
                        "lastName": "Doe",
                        "mobile": "9504583",
                        "email": "john.doe2@example.com",
                        "gender": "Male",
                        "dateOfBirth": "1999/12/12",
                        "mealType": "Non-Veg",
                        "passportNumber": "c1945678",
                        "passportIssueDate": "2022/12/12",
                        "passportExpiryDate": "2036/12/12",
                        "address": "Hinoo, Doranda",
                        "state": "Jharkhand",
                        "city": "Ranchi",
                        "country": "India",
                        "citizenship": "Indian"
                },
                {
                        "guestId": "3",
                        "guestType": "ADULT",
                        "firstName": "John3",
                        "lastName": "Doe",
                        "mobile": "9504583",
                        "email": "john.doe3@example.com",
                        "gender": "Male",
                        "dateOfBirth": "1999/12/12",
                        "mealType": "Non-Veg",
                        "passportNumber": "c1945678",
                        "passportIssueDate": "2022/12/12",
                        "passportExpiryDate": "2036/12/12",
                        "address": "Hinoo, Doranda",
                        "state": "Jharkhand",
                        "city": "Ranchi",
                        "country": "India",
                        "citizenship": "Indian"
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