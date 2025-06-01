const mongoose = require("mongoose"); // ✅ MUST be here
const Message = require("../models/Message");
const { io, userSocketMap } = require("../server");


exports.getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;

    const chats = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });

    await Message.updateMany(
      { senderId: senderId, receiverId },
      { seen: true }
    );

    res.status(200).json({ success: true, message: chats });
  } catch (error) {
    console.log("Error in getMessage:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.user.id;
    console.log("user id ",senderId);
    const receiverId = req.params.id;

    if (!receiverId) {
      return res
        .status(400)
        .json({ success: false, message: "Receiver ID is required" });
    }

    
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
    });

    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    // console.log("user id ",senderId);
    res.status(500).json({ success: false, message: error.message });
  }
};
