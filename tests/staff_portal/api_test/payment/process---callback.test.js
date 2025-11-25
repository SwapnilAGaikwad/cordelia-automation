// AUTO-GENERATED from Postman collection
require('dotenv').config();
const api = require('../../utils/apiClient');
const { expect } = require('chai');

describe('Payment - process - callback', function(){
  this.timeout(20000);
  it('process - callback should return expected response', async function(){
    try{
      const res = await api.request({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/payment/callback`,
        data: {
        "event_type": "payment_success",
        "status": "success",
        "message": "Payment Successful",
        "nimbbl_order_id": "o_5a9zyr9zGJ8ygpG1",
        "nimbbl_transaction_id": "o_5a9zyr9zGJ8ygpG1-02911",
        "transaction": {
                "transaction_id": "o_5a9zyr9zGJ8ygpG1-02911",
                "nimbbl_error_code": "",
                "payment_partner": "Easebuzz",
                "status": "succeeded",
                "sub_payment_mode": {
                        "upi_id": "9916653661-2@ibl",
                        "upi_holder": "MUSKAAN J BHANDARI",
                        "upi_app_name": "PhonePe",
                        "upi_instrument": "Bank Account",
                        "upi_flow": "collect"
                },
                "psp_transaction_id": "E2506030H2P49D",
                "payment_mode": "UPI",
                "nimbbl_consumer_message": "",
                "nimbbl_merchant_message": "",
                "transaction_currency": "INR",
                "transaction_amount": 26752,
                "additional_charges": 0,
                "offer_discount": 0,
                "offer_id": "",
                "refund_arn": null,
                "signature": "03522081ae592f878ee1b51847600f589b2f64c04214bb3170bfddcdf55c0dcc",
                "signature_version": "v3",
                "transaction_type": "payment",
                "processing_payment_partner": "Easebuzz",
                "payment_acquirer": null,
                "payment_arn": "515453784776"
        },
        "order": {
                "order_date": "2025-06-03 07:47:09",
                "amount_before_tax": 26752,
                "tax": 0,
                "total_amount": 26752,
                "referrer_platform": "web",
                "invoice_id": "3d03d855-a81e-4aac-bb28-e9899a002e19",
                "shopfront_domain": "https://staffpro.cordeliacruises.com/make-payment/8e268d40-2889-484a-bd61-0611722f6bf9/",
                "attempts": 1,
                "device_user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
                "status": "completed",
                "currency": "INR",
                "description": "",
                "cancellation_reason": "Unable to find my payment method",
                "additional_charges": 0,
                "grand_total": 26752,
                "offer_discount": 0,
                "custom_attributes": [],
                "device": {
                        "browser_name": "Mobile Safari",
                        "device_name": "iPhone",
                        "os_name": "iOS",
                        "ip_address": "13.202.105.168"
                },
                "refund_details": {
                        "refundable_currency": "INR",
                        "available_refundable_amount": 26752,
                        "refunded_amount": 0,
                        "total_refundable_amount": 26752
                }
        },
        "nimbbl_signature": "03522081ae592f878ee1b51847600f589b2f64c04214bb3170bfddcdf55c0dcc",
        "psp_raw_response": {
                "key": "3L8BN8A7CE",
                "furl": "https://api.nimbbl.tech/api/easebuzz/callback",
                "hash": "311515092cc3a4a238662f1a088cd10affb455128f74d4a5b1fc1156cb415986cbf4ed2c6a9c72e4d452ef9361670720dc1019b658a5129793e0e6cd644b87e4",
                "mode": "UPI",
                "surl": "https://api.nimbbl.tech/api/easebuzz/callback",
                "udf1": "",
                "udf2": "",
                "udf3": "",
                "udf4": "",
                "udf5": "",
                "udf6": "",
                "udf7": "",
                "udf8": "",
                "udf9": "",
                "email": "nickboiiiiiiii@gmail.com",
                "error": "APPROVED OR COMPLETED SUCCESSFULLY",
                "phone": "7760184579",
                "txnid": "o_5a9zyr9zGJ8ygpG1-02911",
                "udf10": "",
                "amount": "26752.0",
                "status": "success",
                "upi_va": "9916653661-2@ibl",
                "PG_TYPE": "NA",
                "addedon": "2025-06-03 07:47:31.000000",
                "cardnum": "NA",
                "bankcode": "NA",
                "auth_code": "",
                "bank_name": "NA",
                "card_type": "NA",
                "easepayid": "E2506030H2P49D",
                "firstname": "Harsh",
                "productinfo": "Not Available",
                "service_tax": "0.0",
                "auth_ref_num": "NA",
                "bank_ref_num": "515453784776",
                "cardCategory": "NA",
                "issuing_bank": "NA",
                "name_on_card": "NA",
                "discount_code": "NA",
                "error_Message": "APPROVED OR COMPLETED SUCCESSFULLY",
                "merchant_logo": "NA",
                "payment_source": "Easebuzz",
                "service_charge": "0.0",
                "unmappedstatus": "NA",
                "discount_amount": "0.0",
                "net_amount_debit": "26752.0",
                "payment_category": "DEFAULT",
                "settlement_amount": "26752.0",
                "cancellation_reason": "NA",
                "cash_back_percentage": "50.0",
                "deduction_percentage": "0.0"
        },
        "user": {
                "email": "nickboiiiiiiii@gmail.com",
                "mobile": "7760184579",
                "name": "Harsh  Jain",
                "user_id": "user_j5N7AKrJJNnY23qY"
        },
        "is_webhook": true,
        "payment_link_info": {
                "merchant_invoice_id": null
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