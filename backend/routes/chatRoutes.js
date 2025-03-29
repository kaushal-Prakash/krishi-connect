import express from "express";
import { sendMessage, initSocket } from "../controllers/chatController.js";

const router = express.Router();

// HTTP route
router.post("/send", sendMessage);

// Socket initialization function
export const initializeChatSockets = (io) => {
  const chatNamespace = io.of("/chat");

  chatNamespace.on("connection", (socket) => {
    // Add authentication logic here if needed
    // Example: const token = socket.handshake.auth.token;

    initSocket(socket);
  });

  return chatNamespace;
};

export default router;
