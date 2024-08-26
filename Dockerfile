FROM node:18-alpine as builder

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build the app
COPY . .
RUN npm run build

# Final image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "dist/main.js"]