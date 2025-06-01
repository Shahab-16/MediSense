import React, { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';

const dummyMessages = [
    { id: 1, senderId: '1', text: 'Hey, how are you?' },
    { id: 2, senderId: '2', text: 'I’m good! How about you?' },
    { id: 3, senderId: '1', text: 'Doing great, thanks for asking.' },
    { id: 4, senderId: '2', text: 'Need help with anything today?' },
    { id: 5, senderId: '1', text: 'Yes, I have a question about my prescription.' },
];

const ChatPage = () => {
    const [messages, setMessages] = useState(dummyMessages);
    const [newMessage, setNewMessage] = useState('');
    const [input, setInput] = useState("");
    //   const {message,setMessage,getMessage,sendMessage}=useContext(StoreContext)

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), sender: 'user', text: newMessage }]);
            setNewMessage('');
        }
    };
    
    //for data coming from databse
    //   const handleSendMessage=async(e)=>{
    //     e.preventDefault();
    //     if(input.trim()=="") return;
    //     await sendMessage({text:input.trim()});
    //     setInput("");
    //   }

    useEffect(() => {

    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center'>
            <div className='border shadow-xl rounded-2xl w-2/5 h-[80vh] bg-white flex flex-col'>
                {/* Header */}
                <div className='p-4 border-b font-bold text-lg text-center bg-blue-200 rounded-t-2xl'>
                    MedChat
                </div>

                {/* Messages Area */}
                <div className='flex-1 p-4 space-y-3 overflow-y-auto scrollbar-hide'>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[70%] p-2 text-sm rounded-lg break-all ${msg.senderId === '2'
                                    ? 'bg-blue-500 text-white self-start mr-auto rounded-bl-none'
                                    : 'bg-gray-200 text-gray-800 self-end ml-auto rounded-br-none'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className='p-4 border-t flex gap-2 items-center bg-blue-50 rounded-b-2xl'>
                    <input
                        type='text'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className='flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300'
                        placeholder='Type your message...'
                    />
                    <button
                        onClick={handleSend}
                        className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition'
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
