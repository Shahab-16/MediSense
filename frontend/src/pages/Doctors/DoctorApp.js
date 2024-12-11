import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DoctorsNavbar from '../../components/Doctors/DoctorsNavbar';
import Footer from '../../components/Doctors/Footer';
import HomePage from './HomePage';
// Import other page components here

const DoctorApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add routes for other pages */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
};

export default DoctorApp;
