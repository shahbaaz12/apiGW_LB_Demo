# Use Node.js 18 base image
FROM node:18

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json first and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port (set in docker-compose)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
