const request = require('supertest');
const app = require('../src/index'); // Import app directly

const Request = require('../src/models/Request');
const Item = require('../src/models/Item');

// Mock the models to avoid actual database interaction
jest.mock('../src/models/Request');
jest.mock('../src/models/Item');

describe('RequestController - Create Request', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls and implementations before each test
    });

    it('should return 400 if required fields are missing', async () => {
        const mockRequest = {
            requestType: 'delivery', // Missing other required fields
            userId: 'user123',
        };

        const res = await request(app) // No server listening, just the app instance
            .post('/request')
            .send(mockRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing required fields.');
    });
});
