module.exports = {
  root: true,
  env: {
    browser: true, // For frontend code
    node: true,    // For backend code
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',       // For React (frontend)
    'plugin:@typescript-eslint/recommended', // For TypeScript
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX for React
    },
  },
  plugins: [
    'react',            // For React rules
    '@typescript-eslint', // For TypeScript rules
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  rules: {
    // Example custom rules
    'no-console': 'warn', // Warn on console.log statements
    'react/prop-types': 'off', // Turn off prop-types rule for React
  },
  ignorePatterns: [
    'node_modules/',  // Ignore dependencies
    'dist/',          // Ignore build output
  ],
};
