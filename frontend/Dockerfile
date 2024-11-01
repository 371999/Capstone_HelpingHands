# Step 1: Use a Node.js image for building the application
FROM node:18 AS builder

# Step 2: Set working directory and copy project files
WORKDIR /app
COPY . .
 
# Step 3: Install dependencies and build the Next.js application 
RUN npm install 
RUN npm run build

# Step 4: Use a lightweight Node.js image for serving the built application
FROM node:18-alpine AS production 

# Step 5: Set working directory and copy over the build artifacts from the builder stage
WORKDIR /app
COPY --from=builder /app ./

# Step 6: Expose the port that the app will run on
EXPOSE 3000

# Step 7: Start the Next.js application
CMD ["npm", "run", "start"]
