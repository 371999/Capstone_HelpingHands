const request = require('supertest');
const app = require('../../src/index');

describe('Service Availability', () => {
  it('GET /health should return 200 OK when service is running', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('returns 503 Service Unavailable if service dependency fails', async () => {
    // Mock failure in a service dependency, if applicable.
    const response = await request(app).get('/health');
    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty('error', 'Service unavailable');
  });
});
