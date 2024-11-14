# Dockerfile for Frontend
FROM node:20
  
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

# Copy Jest configuration files (if they are needed for testing)
COPY jest.config.js ./
COPY integration.jest.config.js ./
COPY docker.jest.config.js ./

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
