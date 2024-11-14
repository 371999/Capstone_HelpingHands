const request = require('supertest');
const app = require('../../src/index');

describe('Item Routes', () => {
  it('POST /items should create an item and return itemId', async () => {
    const response = await request(app)
      .post('/items')
      .send({ title: 'Test Item', description: 'Item description' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('itemId');
  });

  it('GET /items/:id should return item details', async () => {
    const response = await request(app).get('/items/existingId');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });
});
