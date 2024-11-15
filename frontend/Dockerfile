# Stage 1: Development/Testing Stage
FROM node:20.5.0 AS development

WORKDIR /app

# Copy dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies and required tools with pinned versions
RUN apt-get update && apt-get install -y --no-install-recommends curl=7.68.0-1ubuntu2.12 && \
    npm install -g pnpm@7.16.0 && \
    pnpm install --frozen-lockfile && \
    rm -rf /var/lib/apt/lists/*

# Copy application source code
COPY . .

# Run tests
RUN pnpm run test

# Build the application
RUN pnpm run build

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
CMD ["pnpm", "run", "start"]
