# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your NestJS application listens on (default is 3000)
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "run", "start:prod"]
