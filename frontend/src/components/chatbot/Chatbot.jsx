import React, { useState, useRef, useEffect, useContext } from 'react';
import { AiOutlineMessage, AiOutlineClose } from 'react-icons/ai';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Chatbot = () => {
  console.log("Hii i m in Chatbot");  
  const [isOpen, setIsOpen] = useState(false);
  const {BACKEND_URL} = useContext(StoreContext);
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm Medibot, your healthcare assistant from Medisense. How can I help you today?", 
      isBot: true 
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = inputMessage;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare chat history for context
      const chatHistory = messages
        .filter(msg => msg.text) // Filter out any empty messages
        .map(msg => ({
          role: msg.isBot ? "model" : "user",
          parts: [{ text: msg.text }],
        }));

      // Call backend API
      const response = await axios.post(`${BACKEND_URL}/user/api/chatbot/chat`, {
        message: userMessage,
        history: chatHistory.slice(-10), // Send last 10 messages for context
      });

      // Add bot response to chat
      setMessages(prev => [...prev, { 
        text: response.data.response || "Sorry, I couldn't process that request.", 
        isBot: true 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble responding. Please try again later.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl w-80 h-[500px] flex flex-col border border-gray-200">
          {/* Chatbot Header */}
          <div className="bg-blue-700 text-white rounded-t-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Medibot Assistant</h3>
              <p className="text-xs opacity-90">Ask me about healthcare services</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-2xl transition-colors"
            >
              <AiOutlineClose />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <ChatMessage 
                key={index}
                message={msg.text}
                isBot={msg.isBot}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[70%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="transition-transform hover:scale-110"
      >
        {isOpen ? null : (
          <div className="bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center">
            <AiOutlineMessage size={24} />
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;