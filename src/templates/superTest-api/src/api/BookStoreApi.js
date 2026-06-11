import supertest from 'supertest';
import { config } from '../config/index.js';

export class BookStoreApi {
  constructor(baseUrl = config.bookStore.baseUrl) {
    this.client = supertest(baseUrl);
  }

  listBooks() {
    return this.client
      .get('/Books')
      .set('Accept', 'application/json');
  }

  getBookByIsbn(isbn) {
    return this.client
      .get(`/Book?ISBN=${isbn}`)
      .set('Accept', 'application/json');
  }
}
