import React, { useState, useRef, useEffect, useContext } from "react";
import { FaMicrophone, FaVolumeUp, FaStethoscope } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const ArtificialDoctor = () => {
  const {BACKEND_URL} = useContext(StoreContext);
  const [isRecording, setIsRecording] = useState(false);
  const [doctorMessage, setDoctorMessage] = useState(
    "Hello! I'm Dr. MediAI. Press the microphone to describe your symptoms."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const timeoutRef = useRef(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setDoctorMessage("Listening...");
        setError(null);

        // Set a timeout for no speech detection
        timeoutRef.current = setTimeout(() => {
          if (isRecording) {
            setError("No speech detected. Please try again.");
            recognitionRef.current.stop();
          }
        }, 5000); // 5 seconds timeout
      };

      recognitionRef.current.onresult = async (event) => {
        clearTimeout(timeoutRef.current);
        const transcript = event.results[0][0].transcript;
        await processUserInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        clearTimeout(timeoutRef.current);
        console.error("Speech recognition error:", event.error);

        let errorMessage = "Sorry, I didn't catch that. Please try again.";
        if (event.error === "no-speech") {
          errorMessage = "No speech detected. Please speak clearly.";
        } else if (event.error === "audio-capture") {
          errorMessage =
            "Microphone not found. Please check your microphone settings.";
        } else if (event.error === "not-allowed") {
          errorMessage =
            "Microphone access denied. Please allow microphone permissions.";
        }

        setError(errorMessage);
        setIsRecording(false);
        setIsProcessing(false);
      };

      recognitionRef.current.onend = () => {
        clearTimeout(timeoutRef.current);
        setIsRecording(false);
      };
    } else {
      setError(
        "Speech recognition is not supported in your browser. Please use Chrome or Edge."
      );
    }

    return () => {
      clearTimeout(timeoutRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording && !isProcessing) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Error starting recognition:", err);
        setError("Error starting voice recognition. Please refresh the page.");
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const processUserInput = async (userText) => {
    setIsProcessing(true);
    setDoctorMessage("Processing your symptoms...");
    setError(null);

    try {
      // Step 1: Get AI doctor response
      console.log(
        "inside artificial doctor component and the symptoms are",
        userText
      );
      const aiResponse = await axios.post(
        `${BACKEND_URL}/user/api/artificial-doctor`,
        {
          text: userText,
        }
      );

      const responseText = aiResponse.data.response;
      setDoctorMessage(responseText);

      // Step 2: Convert response to speech using Web Speech API
      speakResponse(responseText);
    } catch (error) {
      console.error("Error processing request:", error);
      setError("Sorry, I couldn't process your request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const speakResponse = (text) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel();

      // Wait for voices to be loaded
      const voices = synthRef.current.getVoices();
      let voice = voices.find((v) => v.lang.includes("en"));

      if (!voice) {
        // If voices aren't loaded yet, wait for them
        synthRef.current.onvoiceschanged = () => {
          const voices = synthRef.current.getVoices();
          voice = voices.find((v) => v.lang.includes("en"));
          if (voice) {
            const utterance = createUtterance(text, voice);
            synthRef.current.speak(utterance);
          }
        };
      } else {
        const utterance = createUtterance(text, voice);
        synthRef.current.speak(utterance);
      }
    }
  };

  const createUtterance = (text, voice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      setError("Error playing the response. Please try again.");
    };
    return utterance;
  };

  const playAudioResponse = () => {
    if (synthRef.current && doctorMessage) {
      speakResponse(doctorMessage);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Audio element for playing responses */}
      <audio ref={audioRef} src={currentAudio} />

      {/* Main Container */}
      <div className="flex flex-col flex-1 mx-auto w-full max-w-md h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex items-center justify-center rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg flex items-center justify-center">
                <FaStethoscope className="text-blue-600 text-xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-400 rounded-full p-1 shadow-md">
                <FaVolumeUp className="text-xs text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">Dr. MediAI</h1>
              <p className="text-sm text-blue-100">Voice Health Assistant</p>
            </div>
          </div>
        </div>

        {/* Doctor Animation Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="relative w-64 h-64 mb-8">
            <motion.div
              className="absolute inset-0 bg-blue-100 rounded-full flex items-center justify-center shadow-lg"
              animate={
                isRecording
                  ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, -5, 5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: isRecording ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <div className="w-48 h-48 bg-white rounded-full border-4 border-blue-300 flex items-center justify-center relative">
                {/* Eyes */}
                <div className="flex space-x-8 absolute top-16">
                  <div className="w-6 h-6 bg-blue-600 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                  <div className="w-6 h-6 bg-blue-600 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                </div>

                {/* Mouth - animates when speaking */}
                <div
                  className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 
                  ${
                    isRecording
                      ? "w-8 h-4 bg-red-300 rounded-full"
                      : "w-6 h-2 bg-red-300 rounded-full"
                  }`}
                  style={
                    isRecording
                      ? { animation: "mouthMove 0.5s infinite alternate" }
                      : {}
                  }
                ></div>
              </div>

              {/* Stethoscope */}
              <FaStethoscope className="absolute -top-2 -left-2 text-blue-500 text-3xl rotate-45" />
            </motion.div>
          </div>

          {/* Doctor's Message */}
          <div className="bg-white p-4 rounded-xl shadow-md max-w-md w-full mb-8 min-h-20 max-h-48 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center text-gray-700 w-full h-full"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2 h-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              ) : error ? (
                <div className="h-full flex items-center justify-center">
                  <span className="text-red-500 px-2">{error}</span>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-40 px-2 py-1 w-full text-left">
                  {doctorMessage}
                </div>
              )}
            </motion.div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45"></div>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-col items-center w-full px-6">
            <motion.button
              onClick={isRecording ? stopRecording : startRecording}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full p-6 shadow-xl ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
              disabled={isProcessing}
            >
              <FaMicrophone className="text-2xl" />
              {isRecording && (
                <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></span>
              )}
            </motion.button>

            <p className="mt-4 text-sm text-gray-500">
              {isRecording
                ? "Speak now..."
                : isProcessing
                ? "Processing..."
                : "Press and hold to speak"}
            </p>

            {doctorMessage && !isRecording && !isProcessing && !error && (
              <button
                onClick={playAudioResponse}
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaVolumeUp className="mr-2" /> Hear response again
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-blue-600">Note:</span> For
            emergencies, contact healthcare providers directly.
          </p>
        </div>
      </div>

      {/* CSS for mouth animation */}
      <style jsx>{`
        @keyframes mouthMove {
          0% {
            height: 4px;
            width: 8px;
          }
          50% {
            height: 6px;
            width: 10px;
          }
          100% {
            height: 4px;
            width: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ArtificialDoctor;
