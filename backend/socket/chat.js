const Message = require('../models/Message');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a chat room
    socket.on('join-chat', (gigId) => {
      socket.join(gigId);
      console.log(`User joined chat for gig: ${gigId}`);
    });

    // Send message
    socket.on('send-message', async (data) => {
      try {
        const { gigId, senderId, receiverId, text } = data;

        const message = new Message({
          gigId,
          senderId,
          receiverId,
          text
        });

        await message.save();

        // Emit to room
        io.to(gigId).emit('receive-message', {
          ...data,
          createdAt: new Date()
        });
      } catch (error) {
        console.error('Message error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;