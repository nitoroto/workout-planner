# Workout Planner

Welcome to the **Workout Planner** repository! This repository contains the core server component of a workout planner application, implemented in Node.js using the Express framework.

## Overview

The Workout Planner server provides a robust backend service designed to manage fitness planning and tracking functionalities seamlessly. Below are the key highlights of the server:

- **Express Server Initialization:** The backbone of the server, setting up an efficient and scalable environment.
- **Middleware Configurations:** Includes parsing JSON formatted requests and enabling Cross-Origin Resource Sharing (CORS) for smooth interactions from various client-side origins.
- **User Authentication:** Secure and reliable endpoints for user login and registration.
- **Workout Schedule Management:** Efficient endpoints for creating, updating, and managing workout schedules.
- **Data Retrieval:** Fast and reliable endpoints for retrieving workout data to enhance the user experience.
- **Error Handling:** Comprehensive mechanisms to catch and log exceptions, ensuring application integrity and reliability.

## Features

1. **Middleware Configurations**
    - JSON parsing for easy handling of request bodies.
    - CORS support to allow requests from different client origins.

2. **User Authentication**
    - Secure login and registration processes.
    - Token-based authentication to protect user data.

3. **Workout Management**
    - Endpoints for creating and managing workout plans.
    - Retrieval of workout data for users.

4. **Error Handling**
    - Robust error logging and handling to maintain system integrity.
    - User-friendly error messages.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository:

```sh
git clone https://github.com/nitoroto/workout-planner.git
cd workout-planner
```

Install dependencies:

```sh
npm install
```

### Running the Server

Start the server in development mode:

```sh
npm run dev
```

The server should now be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login an existing user.

### Workouts

- `GET /workouts` - Retrieve all workouts.
- `POST /workouts` - Create a new workout.
- `PUT /workouts/:id` - Update a workout.
- `DELETE /workouts/:id` - Delete a workout.
