# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally in the builder stage
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm run build

# Production image for serving the API
FROM node:18-alpine AS production
WORKDIR /app

# Install pnpm in the production stage
RUN npm install -g pnpm

# Copy the built files and necessary dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the API runs on
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
