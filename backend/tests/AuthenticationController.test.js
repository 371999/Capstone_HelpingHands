process.env.JWT_SECRET = 'test_jwt_secret';
const authService = require('backend/src/services/authService.js');
const AuthenticationController = require('backend/src/controllers/AuthenticationController');
const Profile = require('backend/src/models/Profile.js');
const Constants = require('backend/src/utils/Constants');

jest.mock('backend/src/models/Profile.js'); // Mocking Profile model
jest.mock('backend/src/services/authService.js'); // Mocking authService

describe('AuthenticationController', () => {
    describe('userRegistration', () => {
        it('should register a new user and return a success response', async () => {
            const req = {
                body: { email: 'test@example.com', password: 'password123' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            Profile.findOne.mockResolvedValue(null);
            authService.getHashedPassword.mockResolvedValue('hashedPassword');

            await AuthenticationController.userRegistration(req, res);

            expect(res.status).toHaveBeenCalledWith(Constants.STATUSCREATED);
            expect(res.json).toHaveBeenCalledWith({ success: true });
        });
    });

    // Similar test cases can be created for login and other methods
});
