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

# Production image for serving the Next.js app
FROM node:18-alpine AS production

WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 80

# Start the application
CMD ["pnpm", "run", "start"]
