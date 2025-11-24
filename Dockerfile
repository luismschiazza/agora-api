# Use a Node.js base image
FROM node:24.11.1-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]

###################
# Build for production
###################
FROM node:24.11.1-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies and source files from the development stage
COPY --from=development /usr/src/app ./

# Run the build command which creates the production bundle
RUN npm run build

# Install all dependencies, including dev dependencies, to ensure tools like ts-node are available
RUN npm install --include=dev

# Set the NODE_ENV environment variable
ENV NODE_ENV=production

###################
# Production
###################
FROM node:24.11.1-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy the bundled code and dependencies from the build stage
COPY --from=build /usr/src/app ./

# Expose the application port
EXPOSE 3000

# Start the server using the production build
CMD ["node", "dist/main"]
