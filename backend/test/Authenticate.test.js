const Authenticate = require('backend/src/middlewares/Authenticate');
const jwt = require('jsonwebtoken');
const Constants = require('backend/src/utils/Constants');

jest.mock('jsonwebtoken');

describe('Authenticate Middleware', () => {
    it('should call next if JWT is valid', () => {
        const req = { headers: { authorization: 'Bearer validToken' } };
        const res = {};
        const next = jest.fn();
        jwt.verify.mockImplementation((token, secret, cb) => cb(null, { id: 'user123' }));

        Authenticate(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user).toEqual({ id: 'user123' });
    });

    it('should return 401 if JWT is invalid', () => {
        const req = { headers: { authorization: 'Bearer invalidToken' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();
        jwt.verify.mockImplementation((token, secret, cb) => cb(new Error('Invalid token'), null));

        Authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(Constants.UNAUTHORIZED);
        expect(res.send).toHaveBeenCalledWith({ error: Constants.INVALIDTOKEN });
    });
});
