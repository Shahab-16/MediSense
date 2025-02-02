import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMessage, AiOutlineClose } from 'react-icons/ai';
import ChatMessage from './ChatMessage';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your healthcare assistant. How can I help you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const botResponses = {
    // Greetings & Small Talk
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! I’m here to help. What do you need assistance with?',
    'hey': 'Hey! How’s your day going? Let me know how I can help.',
    'how are you': 'I’m just a chatbot, but I’m here to make your experience smooth! How can I assist you today?',
    'good morning': 'Good morning! Wishing you a healthy day ahead. How can I help?',
    'good afternoon': 'Good afternoon! Hope you’re having a great day. How may I assist you?',
    'good evening': 'Good evening! How can I help you with your healthcare needs?',

    // Booking & Consultation
    'appointment': 'You can book an appointment with a doctor online or offline. Just visit the "Appointments" section.',
    'consultation': 'We offer both online and offline consultations. Choose your preferred mode while booking.',
    'doctor': 'You can find and consult doctors from various specialties on our platform.',
    'follow-up': 'For follow-up consultations, simply log in to your account and schedule another session with your doctor.',

    // Medicine Orders & Delivery
    'medicine': 'You can order medicines online and get them delivered to your doorstep.',
    'delivery': 'Medicine delivery usually takes 2-3 days, depending on your location.',
    'order status': 'You can track your medicine order under "My Orders" in your account.',
    'prescription': 'To order prescription medicines, you can upload your prescription while placing the order.',
    'pharmacy': 'We have partnered with trusted pharmacies across India to ensure genuine medicines.',

    // Disease Prediction & AI Services
    'disease prediction': 'Our AI-based system helps predict diseases based on past data. Try it in the "Disease Prediction" section.',
    'health checkup': 'We provide AI-powered health risk analysis to help you stay ahead of potential health issues.',

    // Emergency & Support
    'emergency': 'For medical emergencies, please contact your nearest hospital or dial 108 for an ambulance.',
    'hospitals': 'We connect hospitals, clinics, and pharmacies across India to provide you seamless healthcare services.',
    'contact': 'You can reach our support team at support@healthcare.com or call +91 9876543210.',
    'help': 'Sure! I can assist you with appointments, doctor consultations, medicine orders, and more.',
    
    // Payments & Technical Issues
    'payment': 'We accept various payment methods including credit/debit cards, UPI, and net banking.',
    'refund': 'If you have issues with a payment or refund, please contact our support team.',
    'technical issue': 'Oops! If you’re facing a technical issue, try refreshing the page or reaching out to support.',
    
    // Additional Healthcare Services
    'lab test': 'You can book diagnostic lab tests through our platform and get reports online.',
    'insurance': 'We provide information about health insurance plans. Check our "Insurance" section for details.',
    'specialist': 'Looking for a specialist? We have expert doctors in cardiology, dermatology, neurology, and more.',
    
    // User Experience
    'thank you': 'You’re welcome! Stay healthy and take care. 😊',
    'thanks': 'Glad I could help! Let me know if you need anything else.',
    'bye': 'Goodbye! Take care and stay healthy. If you need help, I’m always here!',
    'default': 'I can assist you with healthcare services, appointments, and medicines. Ask me anything!'
};


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);

    setTimeout(() => {
      const lowerMessage = inputMessage.toLowerCase();
      const responseKey = Object.keys(botResponses).find(key => lowerMessage.includes(key));
      const response = responseKey ? botResponses[responseKey] : botResponses.default;
      
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl w-80 h-[500px] flex flex-col border border-gray-200">
          {/* Chatbot Header */}
          <div className="bg-blue-700 text-white rounded-t-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Healthcare Assistant</h3>
              <p className="text-xs opacity-90">Ask me about appointments, medicines, and more.</p>
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
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
