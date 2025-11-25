require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");

// Import helpers
const mail = require("../../utils/fetchOtpFromEmail"); // utils folder for fetching OTP
const store = require("./otpstore"); // file in auth folder

describe("Auth - send otp", () => {
  it("send otp should return expected response", async () => {
    const email = "swapnil.gaikwad@cordeliacruises.com";
    console.log("➡ Starting Send OTP test for email:", email);

    // Send OTP
    console.log("🔹 Sending OTP...");
    const res = await axios.post(
      `${process.env.API_BASE_URL}/portal/auth/send-otp`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Accept 201 as success since API returns Created
    expect(res.status).to.equal(201);
    console.log("✔ OTP Sent Successfully (status:", res.status, ")");

    // Fetch OTP from email
    console.log("🔹 Fetching OTP from email inbox...");
    const otp = await mail.getOtpFromEmail(); // should return the 6-digit OTP
    console.log("✔ OTP fetched from email:", otp);

    // Save in otpstore.js for login test
    store.email = email;
    store.otp = otp;
    console.log("🔹 OTP and email saved in otpstore.js");
    console.log("📌 Current store:", store);

    expect(store.otp).to.not.be.null;
    console.log("✅ Test Completed: Send OTP");
  });
});
