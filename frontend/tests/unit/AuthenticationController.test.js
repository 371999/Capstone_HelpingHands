const { userRegistration, userLogin } = require('../../src/controllers/AuthenticationController');
const httpMocks = require('node-mocks-http');
const Profile = require('../../src/models/Profile');
const authService = require('../../src/services/authService');

jest.mock('../../src/models/Profile');
jest.mock('../../src/services/authService');

describe('AuthenticationController', () => {
  describe('userRegistration', () => {
    it('returns error if user already exists', async () => {
      Profile.findOne.mockResolvedValue({ email: 'existing@example.com' });
      const req = httpMocks.createRequest({ body: { email: 'existing@example.com' } });
      const res = httpMocks.createResponse();
      await userRegistration(req, res);
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ error: 'User already exists' });
    });
  });

  describe('userLogin', () => {
    it('returns JWT if login successful', async () => {
      Profile.findOne.mockResolvedValue({ email: 'user@example.com', password: 'hashedpassword' });
      authService.matchPassword.mockResolvedValue(true);
      authService.generateJWTToken.mockReturnValue('mockToken');
      const req = httpMocks.createRequest({ body: { email: 'user@example.com', password: 'password123' } });
      const res = httpMocks.createResponse();
      await userLogin(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toHaveProperty('token', 'mockToken');
    });
  });
});
