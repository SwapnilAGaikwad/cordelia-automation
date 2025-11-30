// auth/otpHelper.js
let email = null;
let otp = null;

function setEmail(e) { email = e; }
function getEmail() { return email; }

function setOtp(o) { otp = o; }
function getOtp() { return otp; }

module.exports = { setEmail, getEmail, setOtp, getOtp };
