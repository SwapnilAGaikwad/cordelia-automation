const sendOTP = require('../api_test/auth/sendotp.test');

async function run() {
  const otpResponse = await sendOTP();
  console.log('OTP for next step:', otpResponse);
}

run();
