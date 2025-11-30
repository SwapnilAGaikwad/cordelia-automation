require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");

// Helpers
const store = require("./otpHelper");

describe("Auth - Login with OTP", () => {
  it("should login successfully using stored OTP", async () => {
    const email = store.getEmail();
    const otp = store.getOtp();

    if (!email || !otp) {
      throw new Error("Email or OTP not set. Run Send OTP test first.");
    }

    console.log("➡ Starting Login test");
    console.log("🔹 Using email:", email);
    console.log("🔹 Using OTP:", otp);

    const payload = { email, otp }; // make sure API expects 'otp'
    console.log("➡ Login payload:", payload);

    const res = await axios.post(
      `${process.env.API_BASE_URL}/portal/auth/login`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    expect(res.status).to.equal(200);
    const token = res.data?.accessToken || res.data?.token;
    expect(token).to.be.a("string");
    console.log("✔ Login successful! Access token:", token);

    // Store token for downstream API calls
    store.setToken(token);

    console.log("✅ Login test completed");
  });
});
