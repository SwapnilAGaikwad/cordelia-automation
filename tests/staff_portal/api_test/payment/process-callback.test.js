// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - Process Callback', function(){
  this.timeout(20000);
  it('Process Callback should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/payment/callback`,
        data: {
        "event_type": "payment_success",
        "status": "success",
        "message": "Payment Successful",
        "nimbbl_order_id": "o_JwRNmLOYmj9QWRd4",
        "nimbbl_transaction_id": "o_JwRNmLOYmj9QWRd4-241217073829",
        "transaction": {
                "transaction_id": "o_JwRNmLOYmj9QWRd4-241217073829",
                "nimbbl_error_code": "",
                "payment_partner": "Easebuzz",
                "status": "succeeded",
                "sub_payment_mode": {
                        "card_input_type": "card_pan",
                        "issuer": "HDFC",
                        "card_type": "retail",
                        "scheme": "Rupay",
                        "masked_card": "XXXX XXXX XXXX 2584",
                        "expiry": "XX/XXXX",
                        "card_holder": "VIJAY JETHWANI"
                },
                "psp_transaction_id": "E2412170C0C5M9",
                "payment_mode": "Credit Card",
                "nimbbl_consumer_message": "",
                "nimbbl_merchant_message": "",
                "transaction_currency": "INR",
                "transaction_amount": 67703,
                "additional_charges": 0,
                "offer_discount": 0,
                "offer_id": "",
                "refund_arn": null,
                "signature": "e13a359e13bcdd89f180020a7082a65c59d65ccac060bc12327b067024d4406a",
                "signature_version": "v3",
                "transaction_type": "payment",
                "processing_payment_partner": "Easebuzz",
                "payment_acquirer": null,
                "payment_arn": null
        },
        "order": {
                "order_date": "2024-12-17 07:37:28",
                "tax": 0,
                "total_amount": 67703,
                "referrer_platform": "",
                "invoice_id": "c51bfcd2-7750-4ea5-824e-f1432e16be6d",
                "shopfront_domain": "https://staffpro.cordeliacruises.com/",
                "attempts": 1,
                "device_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
                "status": "completed",
                "currency": "INR",
                "description": "",
                "cancellation_reason": "",
                "additional_charges": 0,
                "grand_total": 67703,
                "offer_discount": 0,
                "custom_attributes": [],
                "device": {
                        "browser_name": "Edge",
                        "device_name": "Other",
                        "os_name": "Windows",
                        "ip_address": "13.202.105.168"
                },
                "refund_details": {
                        "refundable_currency": "INR",
                        "available_refundable_amount": 67703,
                        "refunded_amount": 0,
                        "total_refundable_amount": 67703
                }
        },
        "nimbbl_signature": "e13a359e13bcdd89f180020a7082a65c59d65ccac060bc12327b067024d4406a",
        "psp_raw_response": {
                "status": true,
                "msg": {
                        "txnid": "o_JwRNmLOYmj9QWRd4-241217073829",
                        "firstname": "Vijay",
                        "email": "vijay.jethwani@live.com",
                        "phone": "9423638888",
                        "key": "3L8BN8A7CE",
                        "mode": "CC",
                        "unmappedstatus": "NA",
                        "cardCategory": "NA",
                        "addedon": "2024-12-17 07:38:29",
                        "payment_source": "Easebuzz",
                        "PG_TYPE": "NA",
                        "bank_ref_num": "435229022759",
                        "bankcode": "NA",
                        "error": "Successful Transaction",
                        "error_Message": "Successful Transaction",
                        "name_on_card": "VIJAY JETHWANI",
                        "upi_va": "NA",
                        "cardnum": "XXXXXXXXXXXX2584",
                        "issuing_bank": "NA",
                        "easepayid": "E2412170C0C5M9",
                        "amount": "67703.0",
                        "net_amount_debit": "67703.0",
                        "cash_back_percentage": "50.0",
                        "deduction_percentage": "1.35",
                        "merchant_logo": "NA",
                        "surl": "https://api.nimbbl.tech/api/easebuzz/callback",
                        "furl": "https://api.nimbbl.tech/api/easebuzz/callback",
                        "productinfo": "Not Available",
                        "udf10": "",
                        "udf9": "",
                        "udf8": "",
                        "udf7": "",
                        "udf6": "",
                        "udf5": "",
                        "udf4": "",
                        "udf3": "",
                        "udf2": "",
                        "udf1": "",
                        "card_type": "Credit Card",
                        "hash": "7cdb2a578216d72f409e4c47c3ea43bbc0fa94d4cb259ebc0bd5ea6720b23a4c625080a4971f16050ca9bcc27aabb4bb057876b3aa0089641ee7bd026f0edf0a",
                        "status": "success",
                        "bank_name": "NA",
                        "auth_code": "078367",
                        "auth_ref_num": "NA"
                }
        },
        "user": {
                "email": "vijay.jethwani@live.com",
                "mobile": "9423638888",
                "name": "Vijay  Jethwani",
                "user_id": "user_wr8vzzn5WL4XxvdB"
        }
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