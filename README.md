# Warehouse Safety and Efficiency Monitor (WSEM)

## Overview

The Warehouse Safety and Efficiency Monitor (WSEM) is designed to ensure optimal conditions within various warehouse sections, particularly for sensitive goods. It tracks the condition of goods over a given threshold.

## Objective

The key objective of WSEM is to monitor and maintain ideal conditions in different warehouse sections, focusing on the safety and efficiency of goods storage and handling, especially for sensitive items.

## Features

### 1. User Authentication:
   - Secure account creation and login with JSON Web Tokens (JWT).
   - Profile management, including email preferences and password updates.

### 2. Device Management:
   - Integration of Thingy:91 devices into the user's account.
   - Assigning descriptive names to each device for different warehouse sections or goods categories.
   - Customizable threshold settings for parameters like temperature, humidity, CO2, etc., tailored to the type of goods stored.

### 3. Dashboard:
   - Real-time data visualization from Thingy:91 devices for each warehouse section.
   - Color-coded indicators displaying the status of parameters relative to set thresholds.

### 4. Alert System:
   - Immediate email notifications when device data surpasses user-defined thresholds.
   - Comprehensive alert details including device ID, name, and specific parameter exceeded.

## High-Level Design

### 1. Thingy API Design

#### Endpoints:
- User registration and authentication.
- Adding, listing, and editing Thingy:91 devices.
- Setting and retrieving thresholds for device parameters.
- Triggering and listing alerts based on threshold breaches.

#### MQTT Integration:
- Real-time data reception and processing from Thingy:91 devices via websocket.
- Publish buzz sound request on the detection of anomaly for a given period.

### 2. Thingy Client Design (Web Dashboard)

- **User Authentication Page**: Login and sign-up functionalities.
- **Dashboard/Devices Home**: Device overview, addition, and navigation.
- **Device Details Page**: Data visualization and threshold management.
- **Alerts Page**: Alert history.

## Deployment and Local Setup

For details on deploying and setting up the WSEM project on your local machine, please refer to the [`development.md`](development.md) document in this repository. It provides step-by-step instructions for configuring and running the application using Docker and Docker Compose.

## Additional Documentation

For an in-depth understanding of the WSEM system, including API documentation, please visit the external documentation link: [WSEM API Documentation](https://documenter.getpostman.com/view/11604430/2s9Ykq6zkF). This resource offers comprehensive guidance on API endpoints, request/response formats, and other technical details.