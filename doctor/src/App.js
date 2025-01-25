import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientList from './pages/PatientList';
import AppointmentDetails from './pages/AppointmentDetails';
import VideoConsultation from './pages/VideoConsultation';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/video-consultation/:id" element={<VideoConsultation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
