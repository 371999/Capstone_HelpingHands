# Stage 1: Build the backend application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy the application files and build
COPY . .
RUN pnpm run build

# Stage 2: Production image for serving the backend API
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

# Expose the backend port (make sure it aligns with your K8s service configuration)
ENV PORT=8080
EXPOSE 8080

# Start the backend application
CMD ["node", "dist/index.js"]
