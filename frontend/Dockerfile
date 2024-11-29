# Dockerfile for Frontend
FROM node:20.5.0 
        
WORKDIR /app       
       
COPY package.json pnpm-lock.yaml ./  
       
# Update npm, install pnpm, and install dependencies 
RUN npm install -g npm@latest && \
    npm install -g pnpm@latest && \
    pnpm install --force

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
