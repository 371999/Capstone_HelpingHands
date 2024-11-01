FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY ./package.json ./

# Install dependencies with npm
RUN npm install

# Copy source code and .env file
COPY ./src ./src
COPY ./.env ./.env

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["node", "src/index.js"]
