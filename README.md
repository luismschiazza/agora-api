# Agora API

## Overview

Agora API is a scalable backend service built with **NestJS**, designed to support modern application ecosystems.
It provides a solid architectural foundation including user authentication, email sending, code generation tooling, and MongoDB integration.
The project prioritizes clean structure, reliable development workflows, and full Docker support.


---

## Requirements

To run this project, ensure your machine has the following:

- [Node.js (20.x LTS)](https://nodejs.org/)
- [npm (>= 9.x)](https://www.npmjs.com/) or [Yarn (>= 1.22.x)](https://yarnpkg.com/)
- [Docker Engine (>= 20.x)](https://www.docker.com/)
- [Docker Compose Plugin (>= 2.x)](https://docs.docker.com/compose/)
- [nvm installed](https://github.com/nvm-sh/nvm) 

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/luismschiazza/agora-api.git
cd agora-api
```

### 2. Load the Recommended Node Version

```bash
nvm install
nvm use
```

### 3. Environment Variables

Copy the example configuration file:

```bash
cp .env.example .env
```

Then update `.env` with your environment values, such as:

- MongoDB connection URL
- SMTP configuration
- JWT secrets
- Application ports

### 4. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## Running the Project

You may run the project using Docker or run MongoDB in Docker and NestJS locally.

---

## Running with Docker

### Start Only MongoDB (Recommended for Development)

```bash
docker compose up -d mongo-db
```

Then start NestJS locally with hot reload:

```bash
yarn start:dev
```

### Run Everything in Docker

If you prefer both MongoDB and the API inside Docker containers:

```bash
docker compose up -d
```

> Note: If your Docker installation does not support `docker compose`, use `docker-compose` instead.

---

## Running without Docker

If you prefer local execution without containers:

### Start MongoDB Locally

```bash
mongod
```

### Run the NestJS Application

```bash
yarn start:dev
```

---

## Available Commands

The project includes several useful development scripts defined in `package.json`.

### General Commands

- **`yarn build`**
  Compiles TypeScript into JavaScript in the `dist` folder.

- **`yarn start`**
  Runs the compiled application in production mode.

- **`yarn start:dev`**
  Runs the application with hot reload enabled.
  Recommended for development.

- **`yarn start:prod`**
  Runs the application in production mode.

- **`yarn test`**
  Executes unit tests using Jest.

- **`yarn format`**
  Formats source code using Prettier.

- **`yarn lint`**
  Lints the codebase using ESLint and automatically fixes issues.

### Console Commands

- **`yarn console`**
  Opens the NestJS console environment.

- **`yarn console seed`**
  Seeds the database with initial example data.

---

## Docker Reference Commands

Below are useful Docker commands for local development:

- Start services
  ```bash
  docker compose up -d
  ```

- Stop all running containers
  ```bash
  docker stop $(docker ps -q)
  ```

- Remove all containers
  ```bash
  docker rm $(docker ps -a -q)
  ```

- Remove all images
  ```bash
  docker rmi $(docker images -q)
  ```

- Clean unused resources
  ```bash
  docker system prune -a --volumes
  ```

- View container logs
  ```bash
  docker logs <container_id>
  ```

- Build an image
  ```bash
  docker build -t <image_name> .
  ```

- Run a container
  ```bash
  docker run -d -p <host_port>:<container_port> <image_name>
  ```

---

## Conclusion

This README provides a clean and complete guide for setting up and running the Agora API.
It includes installation steps, environment setup, Docker instructions, and available development commands.

If you need additional sections such as Swagger documentation, deployment guides, or contribution guidelines, feel free to request them.