# Dockerfile for Backend
FROM node:20
 
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

# Copy Jest configuration files (if they are needed for testing)
COPY jest.config.js ./
COPY integration.jest.config.js ./
COPY docker.jest.config.js ./

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
