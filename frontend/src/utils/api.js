import axios from 'axios';
import { io } from 'socket.io-client';

export const API_BASE_URL = import.meta.env.PROD 
  ? '' 
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001');

// Centralized Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Centralized Socket.io helper
export const getSocket = () => {
  const socketUrl = API_BASE_URL || window.location.origin;
  return io(socketUrl);
};

export default api;
