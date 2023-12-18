# production build for angular served by nginx
FROM node:18-alpine as build

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@17.0.5

COPY ./package.json ./
COPY ./package-lock.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your project files
COPY . .

# Build the project for production
RUN npm run build -- --output-path=./dist/out

# Expose port 3200
EXPOSE 3200

# Serve the application
CMD ["npx", "serve", "./dist/out/browser", "-p", "3200", "-s"]



