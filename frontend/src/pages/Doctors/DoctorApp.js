import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorsNavbar from '../../components/Doctors/DoctorsNavbar';
import Footer from '../../components/Doctors/Footer';
import MyAppointment from '../../components/Doctors/MyAppointment';
import MyAppointmentCart from '../../components/Doctors/MyAppointmentCart';
import DoctorsListPage from './DoctorsListPage';
import DoctorsHomePage from './HomePage';
import AbouPage from './AboutPage';
import Appointment from '../../components/Doctors/Appointment';
import AppointmentPage from './AppointmentPage';
import ContactPage from './ContactPage';
import InsideHospital from '../../components/Doctors/InsideHospital';
import HospitalPage from './HospitalPage';
import AllHosptalsPage from './AllHospitalsPage';
import ChatPage from './ChatPage';
import AppointmentVerifyPage from './AppointmentVerifyPage';
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
          <Route path="/my-appointments" element={<MyAppointment/>}/>
          <Route path="/appointment/:docName" element={<AppointmentPage/>}/>
          <Route path="/my-appointment-cart" element={<MyAppointmentCart/>}/>
          <Route path="/contactUs" element={<ContactPage/>}/>
          <Route path="/hospital/:hospitalName" element={<HospitalPage/>}/>
          <Route path="/hospital/:hospitalId/:speciality" element={<HospitalPage/>}/>
          <Route path="/verify-appointment" element={<AppointmentVerifyPage/>}/>
          <Route path="/allhospitals" element={<AllHosptalsPage/>}/>
          <Route path='/chat-with-doctor' element={<ChatPage/>}/>
          <Route path="*" element={<Navigate to="/dashboard/doctors" />} />
        </Routes>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default Doctors;
