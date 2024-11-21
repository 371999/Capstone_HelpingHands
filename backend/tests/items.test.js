const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../src/index');
const Item = require('../src/models/Item');
jest.mock('../src/models/Item');

// Connect to the MongoDB database before all tests
beforeAll(async () => {
  const url = `mongodb+srv://admin:admin@helpinghands.tqb84.mongodb.net/HelpingHands`;
  await mongoose.connect(url);
});

// Clean up the database and close the connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});


describe('Item API', () => {

  // Test returning 404 if user not found with a mock
  it('should return 404 if user not found', async () => {
    const response = await request(server).get('/item/nonexistent@example.com');
    expect(response.status).toBe(404);
  });
});
