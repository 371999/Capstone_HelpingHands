// integration.jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/integration/**/*.test.js'], // Only run files in "tests/integration"
  setupFilesAfterEnv: ['./jest.setup.js'], // Optional: Custom setup for integration tests
  verbose: true
};
