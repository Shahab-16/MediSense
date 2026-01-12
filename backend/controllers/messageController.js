const mongoose = require("mongoose");
const Message = require("../models/Message");
const { getIO, getUserSocketMap } = require("../routes/socket");

exports.getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;

    const chats = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    await Message.updateMany(
      { senderId: receiverId, receiverId: senderId },
      { seen: true }
    );

    res.status(200).json({ success: true, message: chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.user.id;
    const receiverId = req.params.id;

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
    });

    const io = getIO();
    const userSocketMap = getUserSocketMap();

    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
