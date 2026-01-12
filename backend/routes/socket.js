const Message = require("../models/Message");

let ioInstance;
const userSocketMap = {}; // userId -> socketId

const socketHandler = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log("Registered user:", userId);
    });

    socket.on("joinRoom", ({ userId, doctorId }) => {
      const roomId = [userId, doctorId].sort().join("_");
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
      try {
        const msg = await Message.create({ senderId, receiverId, content });
        const roomId = [senderId, receiverId].sort().join("_");
        io.to(roomId).emit("receiveMessage", msg);
      } catch (err) {
        console.error("Socket sendMessage error:", err);
      }
    });

    socket.on("disconnect", () => {
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }
  return ioInstance;
};

const getUserSocketMap = () => userSocketMap;

module.exports = {
  socketHandler,
  getIO,
  getUserSocketMap,
};
