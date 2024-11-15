# Stage 1: Development/Testing Stage
FROM node:20 AS development

WORKDIR /app
 
# Copy dependencies 
COPY package.json pnpm-lock.yaml ./
 
# Install all dependencies (including dev dependencies)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Run tests
RUN pnpm run test

# Build the application
RUN pnpm run build

# Stage 2: Production Stage
FROM node:20-slim AS production

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy only production dependencies from the previous stage
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

# Copy built application from the previous stage
COPY --from=development /app .

# Expose the application's port
EXPOSE 3000

# Use a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Start the application
CMD ["pnpm", "run", "start"]
