// docker.jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/docker/**/*.test.js'], // Only run files in "tests/docker"
  verbose: true
};
