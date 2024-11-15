const axios = require('axios');

describe('Backend Docker Health and Service Checks', () => {
  const backendUrl = 'http://localhost:8080';

  it('should respond to health check endpoint', async () => {
    const response = await axios.get(`${backendUrl}/health`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: 'ok' });
  });

  it('should respond to main API service endpoint', async () => {
    const response = await axios.get(`${backendUrl}/api/main-endpoint`); // Replace with your actual API endpoint
    expect(response.status).toBe(200); // Adjust based on the expected status code
    expect(response.data).toHaveProperty('data'); // Adjust based on your API response structure
  });

  it('should have all necessary environment variables', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.MONGODB_URI).toBeDefined();
    expect(process.env.PORT).toBe('8080'); // Confirm the backend port is correctly set
  });
});
