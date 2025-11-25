const { expect } = require('chai');

function expectStatus(res, allowed=[200,201,202]){
  expect(allowed).to.include(res.status);
}

module.exports = { expectStatus, expect };
