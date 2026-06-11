import { expect } from 'chai';
import { AccountApi } from '../../src/api/AccountApi.js';
import { userFactory } from '../../src/factories/userFactory.js';

const accountApi = new AccountApi();

describe('@account Account API', () => {

  describe('POST /User - Create new user', () => {

    it('@smoke should return 201 with userId when valid credentials are provided', async () => {
      const newUser = userFactory.build();

      const response = await accountApi.createUser(newUser);

      expect(response.status).to.equal(201);
      expect(response.body).to.include.keys('userID', 'username', 'books');
      expect(response.body.username).to.equal(newUser.userName);
    });

    it('@regression should return 400 when password does not meet complexity requirements', async () => {
      const weakPasswordUser = userFactory.build({ password: 'weakpassword' });

      const response = await accountApi.createUser(weakPasswordUser);

      expect(response.status).to.equal(400);
    });

    it('@regression should return 406 when attempting to register a username that already exists', async () => {
      const existingUser = userFactory.build();

      await accountApi.createUser(existingUser);
      const response = await accountApi.createUser(existingUser);

      expect(response.status).to.equal(406);
    });

  });

  describe('POST /GenerateToken - Authenticate user', () => {

    it('@smoke should return 200 with a non-empty token when credentials are valid', async () => {
      const user = userFactory.build();
      await accountApi.createUser(user);

      const response = await accountApi.generateToken(user);

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string').and.not.be.empty;
      expect(response.body.status).to.equal('Success');
    });

  });

});
