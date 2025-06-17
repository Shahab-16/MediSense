import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const DoctorChatWindow = ({ doctorId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const roomId = [doctorId, userId].sort().join('_');
    socket.emit('joinRoom', { userId, doctorId });

    axios.get(`http://localhost:5000/message/chat/${userId}/${doctorId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Error fetching messages:', err));

    const receiveHandler = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on('receiveMessage', receiveHandler);

    return () => socket.off('receiveMessage', receiveHandler);
  }, [userId, doctorId]);

  const sendMessage = () => {
    if (!content.trim()) return;
    socket.emit('sendMessage', { senderId: doctorId, receiverId: userId, content });
    setContent('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gradient-to-br from-purple-900 to-indigo-800 text-white p-4 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center mb-4">💬 Chat with Patient</h3>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto bg-white text-black rounded-lg p-4 space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.senderId === doctorId ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`px-4 py-2 rounded-xl max-w-xs break-words shadow-sm ${
                msg.senderId === doctorId
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-black rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 transition-all px-4 py-2 rounded-lg text-white font-medium shadow-md"
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
};

export default DoctorChatWindow;
