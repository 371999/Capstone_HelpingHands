# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the application (ensure build directory)
RUN pnpm run build

# Production image for serving the Next.js app
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm in the production stage
RUN npm install -g pnpm

# Copy necessary files and dependencies from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 80

# Start the application
CMD ["pnpm", "start"]
