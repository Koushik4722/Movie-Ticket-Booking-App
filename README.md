# booking.com Clone - MERN Stack

A full-stack movie ticket booking web application.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS (v4), React Router, Context API, Socket.io-client
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT Authentication

## Features
- User Authentication (Signup, Login, Logout)
- Browse 100+ movies, theaters, and shows
- Search functionality to filter movies by keyword
- Real-time seat locking using Socket.io (prevents double booking)
- Mock Checkout process
- User Profile and Booking History
- **Ticket Cancellation**: Cancel tickets and incur a 20% cancellation fee while freeing up seats automatically.
- Modern Bright Theme UI (inspired by booking.com colors)

## Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file in the `backend` folder with your MongoDB URI if necessary:
   ```env
   PORT=8080
   MONGO_URI=mongodb://127.0.0.1:27017/bookmyshow_clone
   JWT_SECRET=supersecretjwtkey_bookmyshow
   NODE_ENV=development
   ```
4. Seed the database with mock data (Users, 120 Movies, Theaters, Shows):
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open your browser and go to `http://localhost:3000`.
- **Test User Credentials**:
  - Email: `john@example.com`
  - Password: `123456`
- **Admin User Credentials**:
  - Email: `admin@example.com`
  - Password: `123456`
