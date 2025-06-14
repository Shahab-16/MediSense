const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/:userId/:doctorId', async (req, res) => {
  const { userId, doctorId } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId: doctorId },
      { senderId: doctorId, receiverId: userId },
    ],
  }).sort({ timestamp: 1 });

  res.json(messages);
});

module.exports = router;
