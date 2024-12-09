process.env.JWT_SECRET = 'test_jwt_secret';

const authService = require('backend/src/services/authService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('authService', () => {
    describe('generateJWTToken', () => {
        it('should generate a JWT token', () => {
            const user = { id: '123' };
            jwt.sign.mockReturnValue('mockedToken');

            const token = authService.generateJWTToken(user);

            expect(token).toBe('mockedToken');
        });
    });

    describe('getHashedPassword', () => {
        it('should hash a password', async () => {
            bcrypt.hash.mockResolvedValue('hashedPassword');
            const hash = await authService.getHashedPassword('password123');

            expect(hash).toBe('hashedPassword');
        });
    });
});
