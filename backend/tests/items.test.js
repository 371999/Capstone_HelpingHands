const mongoose = require('mongoose');
const { server, startServer } = require('../src/index');
const request = require('supertest');
jest.mock('../src/models/Item'); // Mock Item model

let testServer;

// Set up MongoDB connection and start server before all tests
beforeAll(async () => {
    const url = `mongodb+srv://admin:admin@helpinghands.tqb84.mongodb.net/HelpingHands`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    testServer = startServer(5000); // Start the server on a test-specific port
});

// Clean up database and close server after all tests
afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
    testServer.close(); // Close the server to prevent open handle issues
});

describe('Item API', () => {
    it('should return 404 if item not found', async () => {
        const response = await request(server).get('/item/nonexistent@example.com');
        expect(response.status).toBe(404);
    });

    // Add more tests as needed
});
