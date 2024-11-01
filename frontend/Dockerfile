# Copy package files
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code and .env file
COPY frontend/ .

# Build
RUN pnpm build

FROM node:20-alpine
WORKDIR /app

# Copy necessary files (removing next.config.js since it doesn't exist)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

RUN npm install -g pnpm && pnpm install

# Start Next.js
CMD ["pnpm", "start"]
