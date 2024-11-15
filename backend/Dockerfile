# Stage 1: Development/Testing Stage
FROM node:20 AS development

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy application source code
COPY . .

# Run tests (optional)
RUN npm test

# Stage 2: Production Stage
FROM node:20-slim AS production

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy only production dependencies from the previous stage
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application source code from the previous stage
COPY --from=development /app .

# Expose the application's port
EXPOSE 8080

# Use a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Start the application
CMD ["npm", "start"]
