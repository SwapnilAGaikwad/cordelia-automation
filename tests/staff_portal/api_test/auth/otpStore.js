let store = {
  email: 'swapnil.gaikwad@cordeliacuises.com',
  otp: 123456
};

module.exports = {
  setEmail: (email) => { store.email = email; },
  getEmail: () => store.email,

  setOtp: (otp) => { store.otp = otp; },
  getOtp: () => store.otp,
};
