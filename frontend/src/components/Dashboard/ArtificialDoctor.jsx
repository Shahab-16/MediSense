import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaMicrophone, FaStethoscope } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';
import { images } from '../../assets/asset';

const ArtificialDoctor = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Dr. MediAI. How can I assist with your health concerns today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        "I understand your concern. Could you describe your symptoms in more detail?",
        "Based on your description, I recommend hydration and rest. Monitor your symptoms.",
        "This sounds like it may need professional attention. When did these symptoms start?",
        "Many patients report relief with basic care, but consult a doctor if symptoms worsen.",
        "How long have these symptoms persisted? Duration helps with accurate assessment."
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai'
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2 ">
      {/* Main Chat Container */}
      <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full h-full bg-white shadow-lg overflow-hidden mt-2">
        {/* Header with Doctor Image */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white">
                <img 
                  src={images.DoctorChatbot} 
                  alt="AI Doctor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-400 rounded-full p-1">
                <FaRobot className="text-xs text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">Dr. MediAI</h1>
              <p className="text-xs text-blue-100">AI Health Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500 bg-opacity-30 rounded-full">
              <FaStethoscope className="text-xs" />
            </div>
            <button className="p-1 rounded-full hover:bg-blue-700 transition">
              <IoIosArrowDown className="text-lg" />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Welcome Illustration */}
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40">
              <img 
                src={images.DoctorChatbot} 
                alt="AI Doctor" 
                className="w-full h-full object-contain animate-float"
              />
              <div className="absolute inset-0 bg-blue-200 rounded-full opacity-10 blur-sm"></div>
            </div>
          </div>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`max-w-xs rounded-xl p-3 ${message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm shadow'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow border border-gray-100'
                  }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' ? (
                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                      <FaRobot className="text-blue-600 text-xs" />
                    </div>
                  ) : (
                    <div className="bg-white bg-opacity-20 p-1 rounded-full flex-shrink-0">
                      <FaUser className="text-white text-xs" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-medium mb-1">
                      {message.sender === 'ai' ? 'Dr. MediAI' : 'You'}
                    </p>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-xl rounded-bl-sm shadow p-3 flex items-center space-x-2 border border-gray-100">
                <div className="bg-blue-100 p-1 rounded-full">
                  <FaRobot className="text-blue-600 text-xs" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-blue-600 hover:bg-blue-50 transition">
              <FaMicrophone className="text-base" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms..."
              className="flex-1 border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              className={`p-2 rounded-full transition ${inputValue.trim() === '' 
                ? 'text-gray-400 bg-gray-100' 
                : 'text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow'
              }`}
            >
              <FaPaperPlane className="text-base" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            <span className="font-medium text-blue-600">Note:</span> For emergencies, contact healthcare providers directly.
          </p>
        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ArtificialDoctor;