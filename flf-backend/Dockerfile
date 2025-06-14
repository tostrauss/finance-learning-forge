# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application's source code
COPY . .

# Build the TypeScript code into JavaScript
RUN npm run build

# Make your app's port available to the outside world
EXPOSE 3001

# Define the command to run your app
CMD ["node", "dist/app.js"]