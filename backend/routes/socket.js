const Message = require('../models/Message');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    /** ---------------- MESSAGING SOCKET LOGIC ---------------- **/
    socket.on('joinRoom', ({ userId, doctorId }) => {
      const roomId = [userId, doctorId].sort().join('_');
      socket.join(roomId);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
      const msg = await new Message({ senderId, receiverId, content }).save();
      const roomId = [senderId, receiverId].sort().join('_');
      io.to(roomId).emit('receiveMessage', msg);
    });

    /** ---------------- VIDEO CALL SOCKET LOGIC ---------------- **/

    // Join video call room
    socket.on('join-video-call', ({ roomId }) => {
      socket.join(roomId);
      console.log(`${socket.id} joined video call room: ${roomId}`);
      socket.to(roomId).emit('user-joined', { socketId: socket.id });
    });

    socket.on('offer', ({ roomId, offer }) => {
      socket.to(roomId).emit('offer', offer);
    });

    socket.on('answer', ({ roomId, answer }) => {
      socket.to(roomId).emit('answer', answer);
    });

    socket.on('ice-candidate', ({ roomId, candidate }) => {
      socket.to(roomId).emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
