# Dockerfile for Frontend
FROM node:20.5.1  # Specify an exact Node.js version

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
 
# Install pnpm with a specific version and use --frozen-lockfile for reproducible builds
RUN npm install -g pnpm@7.33.6 && pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
