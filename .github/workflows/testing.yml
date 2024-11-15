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

# Run tests with debugging
RUN npm test || (cat /app/npm-debug.log; exit 1)

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
EXPOSE 3000

# Use a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Start the application
CMD ["npm", "start"]
