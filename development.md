# Deployment.md

## Overview

This document provides a comprehensive guide to deploying the Thingy application, which consists of an Angular frontend and a Node.js backend. The application utilizes PostgreSQL for database management and MQTT for message queuing.

## Pre-requisites

Before proceeding with deployment, ensure you have the following installed:
- Docker and Docker Compose
- Git (for cloning the repository)
- Node.js and npm (for running the project locally)

## Cloning the Repository

To get started, clone the project repository from GitHub:

```bash
git clone [https://github.com/lettaz/Warehouse-Condition-Monitor.git]
cd [Warehouse-Condition-Monitor]
```

Replace `[Warehouse-Condition-Monitor]` with your folder name, if you cloned to a specific folder.

## Configuration

Before running the application, configure the environment variables. A file named `env.example` is provided as a template. Create a `.env` file in the root directory and fill it with the appropriate values.

### `env.example` Explained

- `POSTGRES_DB`: The name of your PostgreSQL database.
- `POSTGRES_USER`: Your PostgreSQL database user.
- `POSTGRES_PASSWORD`: Your PostgreSQL database password.
- `MQTT_BROKER_URL`: URL for the MQTT broker.
- `MQTT_USERNAME`: Username for MQTT broker authentication.
- `MQTT_PASSWORD`: Password for MQTT broker authentication.
- `NODE_ENV`: The environment where Node.js is running (e.g., `development`, `production`).
- `JWT_SECRET_KEY`: Secret key for JWT authentication.
- `GMAIL_USER`: Gmail account username for sending emails.
- `GMAIL_PASSWORD`: Gmail account password for sending emails.

## Docker Compose Setup

The application is containerized using Docker, and the configuration is specified in `docker-compose.yml`. To deploy the application, run the following command in the root directory:

```bash
docker-compose up -d
```

This command builds and starts all the necessary containers in detached mode.

## Services in Docker Compose

- `client`: Angular frontend, accessible on `http://localhost:3200`.
- `api`: Node.js backend, accessible on `http://localhost:3900`.
- `db`: PostgreSQL database.
- `mosquitto`: MQTT broker.
- `adminer`: Database administration tool, accessible on `http://localhost:9900`.

## Additional Notes

- Port Configuration: Ensure that the ports specified in docker-compose.yml are not in use by other services.
- Network Connectivity: Verify the network connectivity for the MQTT broker and database.


## Troubleshooting

If you encounter issues during deployment, check the following:
- Docker and Docker Compose versions are compatible with the configuration.
- `.env` file is correctly set up with all required environment variables.
- Network connectivity for MQTT broker and database.
- Ports specified in `docker-compose.yml` are not being used by other services.

For further assistance, refer to the application's documentation or raise an issue in the GitHub repository.