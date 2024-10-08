# MERN ToDo App

This is a full-stack ToDo application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to manage their tasks efficiently, providing functionalities to add, update, delete, and mark tasks as completed.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Demo

[Link to live demo](https://your-demo-link.com)

## Features

- User Authentication (Sign up, Login, Logout)
- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- Responsive design

## Technologies Used

- **Frontend**: React, Redux, Axios, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **Other Tools**: Git, Webpack, Babel, ESLint, Prettier

## Installation

### Prerequisites

- Node.js (>=12.0.0)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```sh
   cd ../frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following environment variable:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to view the application.
2. Register a new account or login with existing credentials.
3. Start managing your tasks!

## API Endpoints

### Auth Routes

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user

### Task Routes

- **GET** `/api/tasks` - Get all tasks
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/:id` - Update an existing task
- **DELETE** `/api/tasks/:id` - Delete a task
- **PATCH** `/api/tasks/:id/complete` - Mark a task as completed

## Contributing

Contributions are welcome! Please fork this repository and create a pull request with your changes. Make sure to follow the code style and include appropriate tests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request
