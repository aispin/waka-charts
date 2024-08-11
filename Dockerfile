# Use the specific Node.js 22.6.0 Alpine image
FROM node:22.6.0-alpine

# Install necessary packages
RUN apk update && apk add --no-cache bash git

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory to /app
WORKDIR /app

# Copy package.json, .npmrc and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml .npmrc /app/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the start.sh script to the working directory
COPY start.sh /app/

# Copy the contents of the src directory to /app/src
COPY src /app/src

# Build the project using pnpm
RUN pnpm build

# Set the entrypoint to start.sh
ENTRYPOINT [ "/app/start.sh" ]