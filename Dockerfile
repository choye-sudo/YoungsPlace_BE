# Use an official Node.js runtime as a parent image
FROM node:20.17.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Set environment variable
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]
