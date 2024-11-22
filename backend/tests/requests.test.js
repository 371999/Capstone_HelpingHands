const request = require('supertest');
const app = require('../src/index');
const db = require('../src/config/DatabaseConnection'); // Updated DatabaseConnection

jest.mock('../src/models/Request');
jest.mock('../src/models/Item');

let server; // Store the server instance

beforeAll(async () => {
    // Start the server on a specific port for testing
    server = app.listen(4000, () => console.log(`Test server running on port 4000`));

    // Connect to the database
    await db.connect();
});

afterAll(async () => {
    // Close the server and database connection after all tests
    server.close();
    await db.disconnect();
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
