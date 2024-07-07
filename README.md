# Real-Time Chat Application

This is a real-time chat application built with a MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication. The application includes user authentication using JWT tokens.

## Features

- User registration and authentication
- Real-time messaging using WebSockets
- Message history stored in MongoDB
- Secure routes with JWT token authentication

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB instance running (local or remote)

## Installation

### Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/EvanieWares/realtime-chat-app.git
    cd realtime-chat-app
    ```

2. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following environment variables:

    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Project Structure

### Backend

- `server.ts` - Entry point of the backend application
- `models/messageModel.ts` - Mongoose model for chat messages
- `controllers/chatController.ts` - Controller for handling chat message operations
- `routes/chatRoutes.ts` - Router for chat-related endpoints
- `utils/websocket.ts` - WebSocket setup and event handling

### Frontend

- `src/main.tsx` - Entry point of the frontend application
- `src/App.tsx` - Main application component
- `src/context/UserContext.tsx` - Context for managing user state
- `src/hooks/useChat.ts` - Custom hook for handling chat logic
- `src/components/Chat.tsx` - Component for displaying chat messages
- `src/components/ChatMessage.tsx` - Component for individual chat message

## Usage

1. Register a new user or log in with an existing account.
2. Start sending and receiving messages in real-time.

## API Endpoints

### Auth Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user

### Chat Endpoints

- `POST /api/chat/messages` - Post a new chat message (requires JWT token)

## WebSocket Events

- `chat message` - Event for sending and receiving chat messages

## Dependencies

### Backend

- `express` - Web framework for Node.js
- `mongoose` - MongoDB object modeling tool
- `jsonwebtoken` - JWT implementation for token-based authentication
- `socket.io` - Library for real-time web applications

### Frontend

- `react` - JavaScript library for building user interfaces
- `axios` - Promise-based HTTP client

## Author

- [Chisomo Psyelera](https://github.com/EvanieWares)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
