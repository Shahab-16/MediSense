// import React, { useState, useMemo } from 'react';
// import { useContext } from 'react';
// import { StoreContext } from '../../context/StoreContext';
// import { useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { useParams } from 'react-router-dom';
// const backendurl = "http://localhost:5000"
// // const dummyMessages = [
//     //     { id: 1, senderId: '1', text: 'Hey, how are you?' },
//     //     { id: 2, senderId: '2', text: 'I’m good! How about you?' },
//     //     { id: 3, senderId: '1', text: 'Doing great, thanks for asking.' },
//     //     { id: 4, senderId: '2', text: 'Need help with anything today?' },
//     //     { id: 5, senderId: '1', text: 'Yes, I have a question about my prescription.' },
//     // ];
    
//     const ChatPage = () => {
//     const socket = useMemo(() => io(backendurl), []);
//     // // const { userId } = useContext(StoreContext);
//     // // console.log("userId afte logging in ", userId);
//     // const { docId }=useParams();
//     // const [messages, setMessages] = useState([]);
//     // const [newMessage, setNewMessage] = useState('');
//     // const [input, setInput] = useState("");
//     // const [socketId, setSocketId] = useState("");
//     // const [room ,setRoom]=useState("");
//     // //   const {message,setMessage,getMessage,sendMessage}=useContext(StoreContext)

//     // const handleSend = (e) => {
//     //     e.preventDefault();
//     //     socket.emit("send-message", { room, newMessage })
//     //     setNewMessage("");
//     // };
//     // useEffect(() => {
//     //     socket.on("connect", () => {
//     //         setSocketId(socket.id);
//     //         console.log("connected", socket.id)
//     //     });
//     //     socket.on("recieved-msg",(msg)=>{
//     //         console.log("recieved from backend",msg);
//     //         setMessages((messages)=>[...messages,msg]);
//     //     })
//     // }, [])
//     // return (
//     //     <div className='min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center'>
//     //         <div className='border shadow-xl rounded-2xl w-2/5 h-[80vh] bg-white flex flex-col'>
//     //         <h1>{room}</h1>
//     //             {/* Header */}
//     //             <div className='p-4 border-b font-bold text-lg text-center bg-blue-200 rounded-t-2xl'>
//     //                 MedChat
//     //             </div>

//     //             {/* Messages Area */}
//     //             <div className='flex-1 p-4 space-y-3 overflow-y-auto scrollbar-hide'>
//     //                 {messages.map((msg,i) => (
//     //                     <div
//     //                         key={i}
//     //                         className='max-w-[70%] p-2 text-sm rounded-lg break-all'
//     //                         // key={i}
//     //                         // className={`max-w-[70%] p-2 text-sm rounded-lg break-all 
//     //                         // // ${msg.senderId === '2'
//     //                         // //     ? 'bg-blue-500 text-white self-start mr-auto rounded-bl-none'
//     //                         // //     : 'bg-gray-200 text-gray-800 self-end ml-auto rounded-br-none'
//     //                         //     // }`
//     //                         // }
//     //                     >
//     //                         {msg}
//     //                     </div>
//     //                 ))}
//     //             </div>

//     //             {/* Input Area */}
//     //             <form onSubmit={handleSend}>

//     //                 <div className='p-4 border-t flex gap-2 items-center bg-blue-50 rounded-b-2xl'>
//     //                     <input
//     //                         type='text'
//     //                         value={newMessage}
//     //                         onChange={(e) => setNewMessage(e.target.value)}
//     //                         // onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
//     //                         className='flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300'
//     //                         placeholder='Type your message...'
//     //                     />
//     //                      <input
//     //                         type='text'
//     //                         value={room}
//     //                         onChange={(e) => setRoom(e.target.value)}
//     //                         // onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
//     //                         className='flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300'
//     //                         placeholder='enter room'
//     //                     />
//     //                     <button type='submit'
//     //                         // onClick={handleSend}
//     //                         className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition'
//     //                     >
//     //                         Send
//     //                     </button>
//     //                 </div>
//     //             </form>
//     //         </div>
//     //     </div>
//     // );

// };
// export default ChatPage;

//commented code remove mt krna abhi kaam  pd skta h uska 


import { useParams } from 'react-router-dom';
import ChatWindow from '../../components/ChatWindow';


const ChatWindowWrapper = () => {
  const { userId,doctorId } = useParams();
  console.log("doctor id in wrapper",doctorId)
  return <ChatWindow userId={userId} doctorId={doctorId} />;
};

export default ChatWindowWrapper;

