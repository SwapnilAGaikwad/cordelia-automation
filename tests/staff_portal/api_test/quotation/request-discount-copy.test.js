// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Quotation - request discount Copy', function(){
  this.timeout(20000);
  it('request discount Copy should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: 'http://localhost:3060/v1/quotation/request-discount',
        data: {
        "quotationId": "871a72c2-85eb-4d44-b500-ece4e77930a8",
        "discountPercentage": 100,
        "requestRemarks": "Curl request"
},
        headers: {
        "sec-ch-ua-platform": "\"Android\"",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiYzA4M2Y4LTBjMjktNDAwMi05N2VhLTVlNzRmYjkwZDM0ZCIsImVtYWlsIjoic2F1cmF2LmRlZXBAY29yZGVsaWFjcnVpc2VzLmNvbSIsImZpcnN0X25hbWUiOiJTYXVyYXYiLCJsYXN0X25hbWUiOiJEZWVwIiwicm9sZUlkIjpudWxsLCJyb2xlIjpudWxsLCJzZXNzaW9uSWQiOiJCV0VQVllVTlhOTlZTVzVEN01WMVA4QjRTNTkxWVNYRyIsImlhdCI6MTc2MjI0Nzk5MywiZXhwIjoxNzYyMjcwMTkzfQ.uD9qMi9H6i_zxd4Agc1ILZ6F4TUzisehexorTpvlElM",
        "Referer": "https://staff.stage.cordeliacruises.com/",
        "sec-ch-ua": "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
        "sec-ch-ua-mobile": "?1",
        "ngrok-skip-browser-warning": "true",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
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