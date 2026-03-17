# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/api-gateway

# Copy package.json and package-lock.json to the working directory
COPY ./services/api-gateway/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY ./services/api-gateway .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]