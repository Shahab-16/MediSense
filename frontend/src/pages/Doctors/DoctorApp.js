import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorsNavbar from '../../components/Doctors/DoctorsNavbar';
import Footer from '../../components/Doctors/Footer';
import DoctorsListPage from './DoctorsListPage';
import DoctorsHomePage from './HomePage';
import AbouPage from './AboutPage';
import Appointment from '../../components/Doctors/Appointment';
import AppointmentPage from './AppointmentPage';
import MyAppointmentPage from './MyAppointmentPage';
import ContactPage from './ContactPage';

import Payment from './Payment';
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
          <Route path="/about" element={<AbouPage/>}/>
          <Route path="/alldoctors/:speciality" element={<DoctorsListPage/>}/>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/my-appointment" element={<MyAppointmentPage/>}/>
          <Route path="/appointment/:docId" element={<AppointmentPage/>}/>
          <Route path="/appointment/booking/:docId" element={<MyAppointmentPage/>}/>
          <Route path="/contactUs" element={<ContactPage/>}/>
        </Routes>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default Doctors;
