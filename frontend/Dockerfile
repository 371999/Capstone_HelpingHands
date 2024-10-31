# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependencies files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy all other files and build the application
COPY . .
RUN pnpm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the Next.js build output from the builder stage
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy nginx configuration (if any)
# Alternatively, you could add an nginx.conf if needed for custom routing
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the application on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
