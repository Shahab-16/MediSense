import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isBot 
            ? 'bg-gray-200 text-gray-800'
            : 'bg-blue-700 text-white'
        }`}
      >
        <ReactMarkdown
          components={{
            // You can customize specific markdown elements here if needed
            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
            // Add other element customizations as needed
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;