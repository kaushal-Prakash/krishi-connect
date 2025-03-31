import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();

connectDB(process.env.MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors: {
      origin: "*", 
      credentials: true
    }
  });
  
  // Socket events
  io.on("connection", (socket) => {
    console.log("🔌 New connection:", socket.id);
  
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`🚪 ${socket.id} joined room ${roomId}`);
    });
  
    socket.on("private_message", ({ roomId, message }) => {
      const messageData = {
        message,
        sender: socket.id,
        timestamp: new Date()
      };
      io.to(roomId).emit("private_message", messageData); // Send to ALL in room
    });
  
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });

// Routes
app.use("/users", userRoutes);
app.use("/farmers", farmerRoutes);
app.use("/admin", adminRoutes);
app.use("/store", storeRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));