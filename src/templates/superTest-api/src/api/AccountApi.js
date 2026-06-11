import supertest from 'supertest';
import { config } from '../config/index.js';

export class AccountApi {
  constructor(baseUrl = config.account.baseUrl) {
    this.client = supertest(baseUrl);
  }

  createUser(userData) {
    return this.client
      .post('/User')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(userData);
  }

  generateToken(credentials) {
    return this.client
      .post('/GenerateToken')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(credentials);
  }

  getUser(userId, token) {
    return this.client
      .get(`/User/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
  }

  deleteUser(userId, token) {
    return this.client
      .delete(`/User/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
  }
}
