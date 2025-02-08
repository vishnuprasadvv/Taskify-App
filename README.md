# Task Management Application

This is a task management application built with a modern stack, designed to manage tasks for multiple users with real-time updates. It supports features like task creation, updates, user authentication, and much more.

## Features

- **User Authentication**: Secure user login and registration with JWT-based authentication.
- **Task CRUD Operations**: Create, read, update, and delete tasks.
- **Real-time Updates**: Using Socket.IO to update tasks and notify users in real-time.
- **Task Statistics**: Track task completion and other useful statistics.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Admin Dashboard**: Admins can manage users and tasks, but tasks assigned by one admin are not visible to others.

## Tech Stack

- **Frontend**: React, Redux, TypeScript, React-Router, Socket.IO-client
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Real-time**: Socket.IO
- **Styling**: DaisyUI, CSS, Styled-components, or any CSS framework you prefer

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **MongoDB**: Have a running instance of MongoDB or use MongoDB Atlas for cloud storage.

### Steps to Install

1. Clone the repository:
    ```bash
    git clone https://github.com/vishnuprasadvv/Taskify-App.git
    cd Taskify-App
    ```

2. Install the backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install the frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

4. Create an `.env` file in the backend directory and configure the following variables:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. Run the backend:
    ```bash
    npm run dev
    ```

6. Run the frontend:
    ```bash
    cd frontend
    npm run dev
    ```

### Docker Setup (Optional)

For an easier deployment, you can use Docker to run the app:

1. **Build the Docker containers**:
    ```bash
    docker-compose up --build
    ```

2. **Access the application**: Open your browser and navigate to `http://localhost:5000` for the frontend and `http://localhost:5173` for the backend.

## Usage

### User Registration and Login

- **Register**: Navigate to the registration page, provide a username, email, and password, and submit the form.
- **Login**: After registration, log in with your credentials to access the application.
- **JWT Authentication**: Once logged in, the app will generate a JWT token, which will be stored in your browser for subsequent requests.

### Task Management

- **Create a Task**: Click on "Add Task" to create a new task. You can specify the task's title, description, due date, and assignee.
- **Update a Task**: Update task details by selecting the task and editing the fields.
- **Delete a Task**: Delete tasks by clicking the "Delete" button on a task card.

### Admin Features

- Admins can view, edit, and delete user accounts.
- Admins can also assign and manage tasks but cannot see tasks assigned to other admins.

### Real-Time Updates

Tasks are updated in real-time, and changes made by one user are immediately reflected to others who are viewing the same task or workspace.

## Acknowledgements

- **Socket.IO** for real-time updates.
- **JWT** for secure user authentication.
- **React** and **Redux** for building the front end.
