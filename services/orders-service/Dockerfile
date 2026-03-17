# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/orders-service

# Copy package.json and package-lock.json to the working directory
COPY ./services/orders-service/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY ./services/orders-service .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/main"]