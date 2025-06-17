import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPhoneSlash, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaUserMd, FaUserInjured } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare, MdMoreVert } from 'react-icons/md';
import { BsRecordCircleFill } from 'react-icons/bs';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

const VideoCall = () => {
  const { userId, doctorId } = useParams();
  const BACKEND_URL = "http://localhost:5000";
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('connecting');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const roomId = [userId, doctorId].sort().join('_');
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const iceServers = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  // Format time for call duration
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Fetch appointment
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/doctors/find-appointment-by-users`, {
          params: { userId, doctorId },
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
  }, [userId, doctorId, token]);

  // WebRTC signaling
  useEffect(() => {
    if (!userId || !doctorId) return;

    socket.emit('join-video-call', { roomId });

    socket.on('user-joined', async () => {
      setCallStatus('ringing');
      await createOffer();
    });

    socket.on('offer', async (offer) => {
      await handleOffer(offer);
    });

    socket.on('answer', async (answer) => {
      await peerRef.current.setRemoteDescription(answer);
      setCallStatus('connected');
      startTimer();
    });

    socket.on('ice-candidate', async (candidate) => {
      try {
        await peerRef.current.addIceCandidate(candidate);
      } catch (e) {
        console.error('Error adding ICE candidate:', e);
      }
    });

    return () => {
      socket.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userId, doctorId]);

  const createOffer = async () => {
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    socket.emit('offer', { roomId, offer });
  };

  const handleOffer = async (offer) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      peerRef.current = new RTCPeerConnection(iceServers);

      stream.getTracks().forEach(track => {
        peerRef.current.addTrack(track, stream);
      });

      peerRef.current.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      peerRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { roomId, candidate: event.candidate });
        }
      };

      await peerRef.current.setRemoteDescription(offer);
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socket.emit('answer', { roomId, answer });
      setCallActive(true);
      setCallStatus('connected');
      startTimer();
    } catch (error) {
      console.error('Error handling offer:', error);
      setError('Failed to establish connection');
    }
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      peerRef.current = new RTCPeerConnection(iceServers);

      stream.getTracks().forEach(track => {
        peerRef.current.addTrack(track, stream);
      });

      peerRef.current.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      peerRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { roomId, candidate: event.candidate });
        }
      };

      setCallActive(true);
      setCallStatus('ringing');
    } catch (err) {
      console.error("Error starting call:", err);
      setError('Could not access media devices.');
    }
  };

  const startTimer = () => {
    setCallDuration(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const endCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.close();
    }
    setCallActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    navigate('/dashboard/doctors/my-appointments');
  };

  const toggleMic = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMicActive(!micActive);
    }
  };

  const toggleCamera = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setCameraActive(!cameraActive);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (screenSharing) {
        // Stop screen sharing
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // Replace tracks
        const sender = peerRef.current.getSenders().find(s => s.track.kind === 'video');
        if (sender) {
          const videoTrack = stream.getVideoTracks()[0];
          sender.replaceTrack(videoTrack);
        }
        setScreenSharing(false);
      } else {
        // Start screen sharing
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // Replace tracks
        const sender = peerRef.current.getSenders().find(s => s.track.kind === 'video');
        if (sender) {
          const videoTrack = stream.getVideoTracks()[0];
          sender.replaceTrack(videoTrack);
        }
        setScreenSharing(true);
        
        // Handle when user stops screen sharing
        stream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
      }
    } catch (err) {
      console.error('Error toggling screen share:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
          <h3 className="text-lg font-bold mb-2">Connection Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90vh] bg-gray-900 mb-4">
      {/* Top status bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 mr-3">
            <FaUserMd className="text-xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold">MEDISNESE HEALTHCARE CONUSULTANT</h1>
            <p className="text-sm text-gray-300">Secure video session</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center mr-6">
            <BsRecordCircleFill className="text-red-500 mr-2 animate-pulse" />
            <span className="font-mono">{formatTime(callDuration)}</span>
          </div>
          <div className="bg-gray-700 px-3 py-1 rounded-lg text-sm">
            <span className="text-green-400 font-medium">●</span> Secure Connection
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="flex-1 relative bg-gray-800">
        {/* Remote video */}
        <div className="w-full h-full">
          {callStatus === 'connecting' || callStatus === 'ringing' ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
              <div className="animate-pulse">
                <div className="bg-gray-800 rounded-full p-6 mb-6">
                  <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center">
                    <FaUserMd className="text-5xl text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {callStatus === 'connecting' ? 'Connecting...' : 'Ringing...'}
              </h2>
              <p className="text-gray-400 mb-6">
                Waiting for {appointment?.role === 'doctor' ? 'patient' : 'doctor'} to join
              </p>
              <div className="flex space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          ) : (
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Local video preview */}
        <div className="absolute bottom-6 right-6 w-72 h-48 bg-black rounded-xl shadow-2xl overflow-hidden border-2 border-white">
          <video 
            ref={localVideoRef} 
            autoPlay 
            playsInline 
            muted
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Call info overlay */}
        <div className="absolute top-6 left-6 bg-black bg-opacity-60 text-white p-4 rounded-xl backdrop-blur-sm">
          {appointment && (
            <>
              <h2 className="text-xl font-bold flex items-center">
                {appointment.role === 'doctor' ? (
                  <>
                    <FaUserInjured className="mr-2 text-teal-400" />
                    Patient: {appointment.patientName}
                  </>
                ) : (
                  <>
                    <FaUserMd className="mr-2 text-teal-400" />
                    Dr. {appointment.doctorName}
                  </>
                )}
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
              <p className="text-gray-300 text-sm">
                Appointment ID: {appointment._id.slice(-8).toUpperCase()}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Call controls */}
      <div className="py-4 px-8 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-center items-center space-x-6">
          <button 
            onClick={toggleMic}
            className={`p-4 rounded-full flex flex-col items-center justify-center ${
              micActive 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-red-500 text-white hover:bg-red-600'
            } transition-all w-14 h-14`}
            aria-label={micActive ? "Mute microphone" : "Unmute microphone"}
          >
            {micActive ? (
              <FaMicrophone size={20} />
            ) : (
              <FaMicrophoneSlash size={20} />
            )}
            <span className="text-xs mt-1">{micActive ? 'Mute' : 'Unmute'}</span>
          </button>
          
          <button 
            onClick={toggleCamera}
            className={`p-4 rounded-full flex flex-col items-center justify-center ${
              cameraActive 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-red-500 text-white hover:bg-red-600'
            } transition-all w-14 h-14`}
            aria-label={cameraActive ? "Turn off camera" : "Turn on camera"}
          >
            {cameraActive ? (
              <FaVideo size={20} />
            ) : (
              <FaVideoSlash size={20} />
            )}
            <span className="text-xs mt-1">{cameraActive ? 'Camera Off' : 'Camera On'}</span>
          </button>
          
          <button 
            onClick={toggleScreenShare}
            className={`p-4 rounded-full flex flex-col items-center justify-center ${
              screenSharing 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            } transition-all w-14 h-14`}
            aria-label={screenSharing ? "Stop screen sharing" : "Start screen sharing"}
          >
            {screenSharing ? (
              <MdStopScreenShare size={24} />
            ) : (
              <MdScreenShare size={24} />
            )}
            <span className="text-xs mt-1">{screenSharing ? 'Stop Share' : 'Share Screen'}</span>
          </button>
          
          {!callActive ? (
            <button 
              onClick={startCall}
              className="p-5 bg-green-500 rounded-full text-white hover:bg-green-600 transition-all shadow-lg shadow-green-500/30 flex flex-col items-center justify-center w-16 h-16"
              aria-label="Start call"
            >
              <FaPhoneSlash size={24} className="rotate-135 transform" />
              <span className="text-xs mt-1">Start Call</span>
            </button>
          ) : (
            <button 
              onClick={endCall}
              className="p-5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 flex flex-col items-center justify-center w-16 h-16"
              aria-label="End call"
            >
              <FaPhoneSlash size={24} />
              <span className="text-xs mt-1">End Call</span>
            </button>
          )}
          
          <button 
            onClick={endCall}
            className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all flex flex-col items-center justify-center w-14 h-14"
            aria-label="Exit call"
          >
            <IoMdExit size={24} />
            <span className="text-xs mt-1">Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;