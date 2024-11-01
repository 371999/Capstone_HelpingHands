# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and dependencies for the application
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application files
COPY . .

# Run TypeScript build if necessary (uncomment if TypeScript build is needed)
# RUN pnpm run build

# Stage 2: Create a lightweight production image
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app .

# Install pnpm in the production image to run the application
RUN npm install -g pnpm

# Expose the application port (adjust if different)
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
