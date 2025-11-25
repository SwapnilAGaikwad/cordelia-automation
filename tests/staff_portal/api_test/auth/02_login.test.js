require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");

// Helpers
const store = require("./otpstore.js");

describe("Auth - Login", () => {
  it("Login should return expected response using stored OTP", async () => {
    const email = store.getEmail();
    const otp = store.getOtp();

    console.log("➡ Starting Login test");
    console.log("🔹 Using email:", email);
    console.log("🔹 Using OTP:", otp);

    const res = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      { email, otp },
      { headers: { "Content-Type": "application/json" } }
    );

    expect(res.status).to.equal(200);
    console.log("✔ Login successful with status:", res.status);
    console.log("✅ Test Completed: Login");
  });
});
