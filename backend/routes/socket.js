const Message = require('../models/Message');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log("user got connected",socket.id)
    socket.on('joinRoom', ({ userId, doctorId }) => {
      const roomId = [userId, doctorId].sort().join('_');
      socket.join(roomId);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
      const msg = await new Message({ senderId, receiverId, content }).save();
      const roomId = [senderId, receiverId].sort().join('_');
      io.to(roomId).emit('receiveMessage', msg);
    });
  });
};

module.exports = socketHandler;
