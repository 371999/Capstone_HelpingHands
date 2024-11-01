# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package files to install dependencies
COPY ./package.json ./


# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN pnpm build

# Stage 2: Create a lightweight image for production
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

# Install pnpm in the production image for running the app
RUN npm install -g pnpm

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
