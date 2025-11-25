// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Notification - Test whatsapp', function(){
  this.timeout(20000);
  it('Test whatsapp should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'GET',
        url: `${process.env.TWILIO_API_URL}`,
        data: {
        "To": `whatsapp:${process.env.TEST_TO_NUMBER}`,
        "From": `whatsapp:${process.env.TEST_FROM_NUMBER}`,
        "ContentSid": `${process.env.CONTENT_SID}`,
        "ContentVariables": "{\"1\":\"Prashant\",\"2\":\"Visit At Sea, Kochi, Lakshadweep, At Sea from Mumbai\",\"3\":\"5\",\"4\":\"2024-05-06T05:30:00.000Z\",\"5\":\"/itinerary-details/9e3285a4-4b6a-4189-80b8-bb1bb8f7e0e4/\"}",
        "Body": "This is a test body"
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