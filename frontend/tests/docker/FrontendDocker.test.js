import axios from 'axios';

describe('Frontend Docker Health and Service Checks', () => {
  it('should serve the application on port 3000', async () => {
    const response = await axios.get('http://localhost:3000');
    expect(response.status).toBe(200);
    expect(response.data).toContain('<title>'); // Check for an element to confirm HTML response
  });

  it('should respond to main frontend service endpoint', async () => {
    const response = await axios.get('http://localhost:3000/api/main'); // Replace with actual API route if applicable
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data'); // Adjust based on expected data structure
  });

  it('should have necessary environment variables', () => {
    expect(process.env.NEXT_PUBLIC_API_URL).toBeDefined();
    expect(process.env.NEXT_PUBLIC_AUTH_URL).toBeDefined();
  });
});
