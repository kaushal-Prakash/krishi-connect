export const sendMessage = (req, res) => {
  try {
    const { message } = req.body;
    const io = req.app.get("io");

    io.emit("new_message", {
      message,
      sender: req.user?.id, // Optional chaining in case user isn't set
      timestamp: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const initSocket = (socket) => {
  console.log(`Socket ${socket.id} initialized for chat`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("private_message", ({ roomId, message }) => {
    socket.to(roomId).emit("private_message", {
      message,
      sender: socket.userId,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected from chat`);
  });
};
