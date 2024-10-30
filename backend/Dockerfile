# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm run build

# Production image for serving the API
FROM node:18-alpine AS production

WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

# Expose the port the API runs on
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
