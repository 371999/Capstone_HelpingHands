# Stage 1: Build the frontend application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy the application files and build 
COPY . .
RUN pnpm run build

# Stage 2: Production image for serving the frontend app
FROM node:18-alpine

WORKDIR /app

# Copy only the built frontend files
COPY --from=builder /app ./

# Expose the frontend port (this should match your service configuration)
ENV PORT=80
EXPOSE 80

# Start the frontend application
CMD ["pnpm", "run", "start"]
