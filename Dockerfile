# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the final image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the build files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy package.json and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]

