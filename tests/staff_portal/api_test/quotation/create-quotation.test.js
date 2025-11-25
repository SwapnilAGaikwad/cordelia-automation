// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Quotation - create quotation', function(){
  this.timeout(20000);
  it('create quotation should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: '{{API_BASE_URL}}/v1/quotation',
        data: {
        "itineraryId": "5a088cb6-66c8-47ba-bff6-b2e9b330a9ff",
        "enquiryId": "eacfbc3e-3e10-4416-b717-9257da39845c",
        "assignmentType": "manual_assign",
        "special_request_ids": [],
        "preference": [],
        "rooms": [
                {
                        "categoryId": "b5b34ecc-c021-44fd-a7eb-d74f533df1dc",
                        "guests": {
                                "adults": 1,
                                "children": 1,
                                "infants": 0
                        },
                        "selectedRoom": {
                                "id": "c4775958-f9ec-4f28-bc19-e806da7fecf3",
                                "room_number": "9102",
                                "room_id": "047c000d-0455-46e7-a0b3-05e498267638",
                                "beds": 3,
                                "itinerary_id": "5a088cb6-66c8-47ba-bff6-b2e9b330a9ff",
                                "deck_no": "9"
                        }
                },
                {
                        "categoryId": "53521460-cfa1-4673-8cf1-0f603742aa61",
                        "guests": {
                                "adults": 1,
                                "children": 1,
                                "infants": 0
                        },
                        "selectedRoom": {
                                "id": "94c720d5-e780-4402-a5f2-4116fdab6c45",
                                "room_number": "8676",
                                "room_id": "acd0123f-4f5c-4f77-8b1a-6ff49d881a95",
                                "beds": 2,
                                "itinerary_id": "5a088cb6-66c8-47ba-bff6-b2e9b330a9ff",
                                "deck_no": "8"
                        }
                }
        ],
        "roomSelectionType": "agent_selection"
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