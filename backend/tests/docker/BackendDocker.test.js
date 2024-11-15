const request = require('supertest');
const app = require('../../src/index');

describe('Backend Docker Health and Service Checks', () => {
  it('should respond to health check endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should respond to service endpoint for main functionality', async () => {
    const response = await request(app).get('/api/main-endpoint'); // Replace with your main API endpoint
    expect(response.statusCode).toBe(200); // Adjust based on expected status code
    expect(response.body).toHaveProperty('data'); // Adjust based on actual response structure
  });

  it('should have all necessary environment variables', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.MONGODB_URI).toBeDefined();
    expect(process.env.PORT).toBeDefined();
  });
});
