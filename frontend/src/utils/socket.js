// utils/socket.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = () => {
  socket = io('http://localhost:5000/chat', {
    withCredentials: true,
  });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};