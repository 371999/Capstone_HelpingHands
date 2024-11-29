const request = require('supertest');
const app = require('../src/index'); // Ensure this exports only `app`, not the running server
const Request = require('../src/models/Request');
const Item = require('../src/models/Item');

// Mock the models to avoid actual database interaction
jest.mock('../src/models/Request');
jest.mock('../src/models/Item');

describe('RequestController - Create Request', () => {
    beforeEach(() => {
        // Clear mock calls and implementations before each test
        jest.clearAllMocks();
    });

    it('should return 400 if required fields are missing', async () => {
        const mockRequest = {
            requestType: 'delivery', // Missing other required fields
            userId: 'user123',
        };

        const res = await request(app)
            .post('/request')
            .send(mockRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing required fields.');
    });
});
