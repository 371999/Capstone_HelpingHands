const request = require('supertest');
const app = require('../src/index');
const Request = require('../src/models/Request');
const Item = require('../src/models/Item');

jest.mock('../src/models/Request');
jest.mock('../src/models/Item');

let server; // Store server instance

beforeAll(() => {
    server = app.listen(4000); // Start the server on a specific port for testing
});

afterAll(() => {
    server.close(); // Close the server after all tests
});

describe('RequestController - Create Request', () => {
    it('should return 400 if required fields are missing', async () => {
        const mockRequest = {
            requestType: 'delivery',
            userId: 'user123',
        };

        const res = await request(server).post('/request').send(mockRequest);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing required fields.');
    });
});
