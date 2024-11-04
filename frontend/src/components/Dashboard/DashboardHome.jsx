// DashboardHome.jsx
import React from 'react';
import {images} from '../../assets/asset';

const DashboardHome = () => {
  return (
    <div className="relative h-full min-h-screen flex items-center justify-center">
      {/* Video Background */}
      <video
        className="absolute rounded-lg top-0 left-0 w-full h-full object-cover"
        src={images.backgroundVideo}
        autoPlay
        loop
        muted
      />

      {/* Welcome Text */}
      <h1 className="relative text-4xl font-bold bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        WELCOME TO MEDISENSE
      </h1>
    </div>
  );
};

export default DashboardHome;

