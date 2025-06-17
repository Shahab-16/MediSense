import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPhoneSlash, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';

const VideoCall = () => {
  const { userId, doctorId } = useParams(); // Use userId and doctorId here
  const BACKEND_URL = "http://localhost:5000";
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

    console.log("token in video call", token);
    console.log("userId in video call", userId);
    console.log("doctorId in video call", doctorId);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [callActive, setCallActive] = useState(false);
  const navigate = useNavigate();
  
  // Fetch appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      try {

        const response = await axios.get(`${BACKEND_URL}/user/doctors/find-appointment-by-users`, {
          params: { userId, doctorId }, // Use the parameters correctly
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setAppointment(response.data.appointment);
        } else {
          setError('Failed to fetch appointment details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointment();
  }, [userId, doctorId, token, BACKEND_URL]);

  // Initialize video call
  const startCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: cameraActive,
        audio: micActive
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Here you would connect to your WebRTC signaling server
      console.log("Starting video call for appointment:", userId, doctorId);
      
      setCallActive(true);
      
      // Simulate remote stream after 2 seconds (for demo)
      setTimeout(() => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream.clone();
        }
      }, 2000);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError('Could not access camera/microphone. Please check permissions.');
    }
  };

  // End call
  const endCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setCallActive(false);
    navigate('/dashboard/doctors/my-appointments');
  };

  // Toggle microphone
  const toggleMic = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMicActive(!micActive);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setCameraActive(!cameraActive);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Video containers */}
      <div className="flex-grow relative">
        {/* Remote video (full screen) */}
        <div className="w-full h-full">
          <video 
            ref={remoteVideoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Local video (small preview) */}
        <div className="absolute bottom-4 right-4 w-64 h-48 bg-black rounded-lg shadow-lg overflow-hidden">
          <video 
            ref={localVideoRef} 
            autoPlay 
            playsInline 
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Call info */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        {appointment && (
          <>
            <h2 className="text-xl font-bold">Call with Dr. {appointment.doctorName}</h2>
            <p className="text-gray-300">
              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
            </p>
          </>
        )}
      </div>
      
      {/* Call controls */}
      <div className="bg-gray-800 py-4 flex justify-center space-x-8">
        <button 
          onClick={toggleMic}
          className={`p-4 rounded-full ${micActive ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'}`}
        >
          {micActive ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
        </button>
        
        <button 
          onClick={toggleCamera}
          className={`p-4 rounded-full ${cameraActive ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'}`}
        >
          {cameraActive ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
        </button>
        
        {!callActive ? (
          <button 
            onClick={startCall}
            className="p-4 bg-green-500 rounded-full text-white"
          >
            <FaPhoneSlash size={24} className="rotate-135" />
          </button>
        ) : (
          <button 
            onClick={endCall}
            className="p-4 bg-red-500 rounded-full text-white"
          >
            <FaPhoneSlash size={24} />
          </button>
        )}
        
        <button 
          onClick={endCall}
          className="p-4 bg-red-500 rounded-full text-white"
        >
          <IoMdExit size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
