import React from "react";
import { images } from "../../assets/asset";
import Chatbot from ".././chatbot/Chatbot";

const DashboardHome = () => {
  return (
    <div className="relative h-screen w-[100%] flex items-center justify-center">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 rounded-lg w-full h-full object-cover"
        src={images.backgroundVideo}
        autoPlay
        loop
        muted
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Welcome Text */}
      <h1 className="relative z-10 text-4xl font-bold text-white px-4 py-2 rounded-lg">
        WELCOME TO MEDISENSE
      </h1>

      {/* Chatbot Component (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-10">
        <Chatbot />
      </div>
    </div>
  );
};

export default DashboardHome;
