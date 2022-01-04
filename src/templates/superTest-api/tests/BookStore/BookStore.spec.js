const { request, expect, app } = require("../../config.js");

describe("Books Store service", () => {
  it("List all books", async () => {
    const response = await request(app)
      .get("/Books")
      .then((response) => {
        expect(response.status).to.equal(200);
      });
  });

  it("List all books", async () => {
    const response = await request(app)
      .get("/Books")
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.books[0].title).to.equal("Git Pocket Guide");
        expect(response.body.books[0].author).to.equal("Richard E. Silverman");
      });
  });

  it('Search to book', async () => {
    const response = await request(app)
    .get("/Book?ISBN=9781449325862")
    .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal('Git Pocket Guide')
        expect(response.body.author).to.equal('Richard E. Silverman')
    });
  })
});
