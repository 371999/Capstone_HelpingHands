const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const Request = require('../src/models/Request');
const Item = require('../src/models/Item');

jest.mock('../src/models/Request');
jest.mock('../src/models/Item');

describe('RequestController - Create Request', () => {
    afterAll(async () => {
        // Close the MongoDB connection after all tests
        await mongoose.connection.close();
    });

    it('should return 400 if required fields are missing', async () => {
        const mockRequest = {
            requestType: 'delivery',
            userId: 'user123',
        };

        const res = await request(app).post('/request').send(mockRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing required fields.');
    });
});
