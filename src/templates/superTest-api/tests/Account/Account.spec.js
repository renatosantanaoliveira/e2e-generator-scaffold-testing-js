const { request, expect, app } = require("../../config.js");
var faker = require("faker");

describe("Account service", () => {
  it.skip("Add new user", async () => {
    var user = {
      userName: faker.name.firstName(),
      password: "5eVTz*DZsLmp",
    };

    const response = await request(app)
      .post("/User")
      .set("accept", "application/json")
      .send({
        user,
      })
      .then((response) => {
        expect(response.status).to.eql(201);
      });
  });
});
