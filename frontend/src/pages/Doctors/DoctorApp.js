import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorsNavbar from '../../components/Doctors/DoctorsNavbar';
import Footer from '../../components/Doctors/Footer';
import DoctorsListPage from './DoctorsListPage';
import DoctorsHomePage from './HomePage';

const Doctors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Shared Navbar */}
      <DoctorsNavbar />

      {/* Routes for Doctors Section */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<DoctorsHomePage />} />
          <Route path="/alldoctors" element={<DoctorsListPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default Doctors;
