const request = require("supertest");
const expect = require("chai").expect;

const app = "https://bookstore.toolsqa.com/BookStore/v1";

module.exports = {
  request,
  expect,
  app,
};
