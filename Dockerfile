# Use a Node.js base image
FROM node:20.17.0-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application in development mode
CMD ["sh", "-c", "yarn console seed && yarn start:dev"]

###################
# Build for production
###################
FROM node:20.17.0-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies and source files from the development stage
COPY --from=development /usr/src/app ./

# Run the build command which creates the production bundle
RUN yarn build

# Install all dependencies, including dev dependencies, to ensure tools like ts-node are available
RUN yarn install --production=false --frozen-lockfile && yarn cache clean

# Set the NODE_ENV environment variable
ENV NODE_ENV=production

###################
# Production
###################
FROM node:20.17.0-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy the bundled code and dependencies from the build stage
COPY --from=build /usr/src/app ./

# Expose the application port
EXPOSE 3000

# Start the server and seed the database using the production build
CMD ["sh", "-c", "yarn console seed && node dist/main"]