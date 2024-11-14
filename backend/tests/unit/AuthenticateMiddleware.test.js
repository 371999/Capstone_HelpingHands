const authenticate = require('../../src/middleware/authenticate');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Authenticate Middleware', () => {
  it('calls next if token is valid', () => {
    const req = httpMocks.createRequest({ headers: { authorization: 'Bearer validToken' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 'validUserId' });
    });

    authenticate(req, res, next);
    expect(next).toHaveBeenCalledWith();
    expect(req.user).toEqual({ userId: 'validUserId' });
  });

  it('returns 401 if token is invalid', () => {
    const req = httpMocks.createRequest({ headers: { authorization: 'Bearer invalidToken' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    authenticate(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Unauthorized' });
  });

  it('returns 403 if authorization header is missing', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    authenticate(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData()).toEqual({ error: 'Forbidden' });
  });
});
