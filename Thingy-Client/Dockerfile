# Step 1: Use an official Node image as a parent image
FROM node:18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json /app/

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the project files into the Docker image
COPY . /app

# Build the project for production
RUN npm run build -- --output-path=./dist/thingy-client

# Step 2: Use nginx to serve the static files
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist/thigy-client/ /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


