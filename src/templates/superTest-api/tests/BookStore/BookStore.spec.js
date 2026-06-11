import { expect } from 'chai';
import { BookStoreApi } from '../../src/api/BookStoreApi.js';

const bookStoreApi = new BookStoreApi();

const KNOWN_ISBN = '9781449325862';
const UNKNOWN_ISBN = '0000000000000';

describe('@bookstore BookStore API', () => {

  describe('GET /Books - List all books', () => {

    it('@smoke should return 200 and a non-empty list of books', async () => {
      const response = await bookStoreApi.listBooks();

      expect(response.status).to.equal(200);
      expect(response.body.books).to.be.an('array').that.is.not.empty;
    });

    it('@regression should return book objects containing all required catalog fields', async () => {
      const response = await bookStoreApi.listBooks();

      const [firstBook] = response.body.books;
      expect(firstBook).to.include.keys(
        'isbn', 'title', 'subTitle', 'author',
        'publish_date', 'publisher', 'pages',
        'description', 'website'
      );
    });

    it('@regression first catalog entry should match the known "Git Pocket Guide" record', async () => {
      const response = await bookStoreApi.listBooks();

      const [firstBook] = response.body.books;
      expect(firstBook.title).to.equal('Git Pocket Guide');
      expect(firstBook.author).to.equal('Richard E. Silverman');
    });

  });

  describe('GET /Book - Get book by ISBN', () => {

    it('@smoke should return 200 and the book details for a valid ISBN', async () => {
      const response = await bookStoreApi.getBookByIsbn(KNOWN_ISBN);

      expect(response.status).to.equal(200);
      expect(response.body.isbn).to.equal(KNOWN_ISBN);
    });

    it('@regression should return title and author for ISBN 9781449325862 (Git Pocket Guide)', async () => {
      const response = await bookStoreApi.getBookByIsbn(KNOWN_ISBN);

      expect(response.body.title).to.equal('Git Pocket Guide');
      expect(response.body.author).to.equal('Richard E. Silverman');
    });

    it('@regression should return 400 for a non-existent ISBN', async () => {
      const response = await bookStoreApi.getBookByIsbn(UNKNOWN_ISBN);

      expect(response.status).to.equal(400);
    });

  });

});
