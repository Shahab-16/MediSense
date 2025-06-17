import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientList from './pages/PatientList';
import AppointmentDetails from './pages/AppointmentDetails';
import VideoConsultation from './pages/VideoConsultation';
import Sidebar from './components/Sidebar';
import ChatWindowWrapper from './pages/ChatPage';
import VideoCall from './components/VideoCall';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/doctor/:doctorName/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/:doctorName/patients" element={<PatientList />} />
          <Route path="/doctor/:doctorName/appointments" element={<AppointmentDetails />} />
          <Route path="/doctor/:doctorName/video-consultation" element={<VideoConsultation />} />
          <Route path="/doctor/chat-with-patient/:userId/:doctorId" element={<ChatWindowWrapper/>}/>
          <Route path="/doctor/video-call-with-patient/:userId/:doctorId" element={<VideoCall/>}/>
          <Route path="*" element={<Navigate to="/doctor/:doctorName/dashboard"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
