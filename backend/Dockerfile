# Stage 1: Development/Testing Stage
FROM node:20.5.0 AS development

WORKDIR /app  

# Copy dependencies
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm ci

# Copy application source code
COPY . .

# Set environment variables for testing
ENV NODE_ENV=test
ENV JWT_SECRET=dummy_secret_for_tests

# Run tests with improved error handling
RUN npm test || (echo "Test failed. Displaying test output:" && cat /app/.npm/_logs/*-debug.log && exit 1)

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:20.5.0-slim AS production

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy built application from the development stage
COPY --from=development /app /app

# Expose the application's port
EXPOSE 8080

# Use a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Start the application
CMD ["npm", "start"]
