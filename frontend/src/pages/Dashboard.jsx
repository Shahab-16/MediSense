// Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from '../components/Dashboard/DashboardHome';
import Doctors from './Doctors/DoctorApp';
import MedicinesApp from './Medicines/MedicinesApp';
import Models from './Models';
import UserInfoApp from './UserInfo/UserInfoApp';
import ArtificialDoctor from '../components/Dashboard/ArtificialDoctor';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="relative flex flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-16' : 'ml-16 lg:ml-100'
        } transition-all duration-300 ease-in-out overflow-x-hidden p-2 h-screen`}
      >
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/doctors/*" element={<Doctors />} />
          <Route path="/medicines/*" element={<MedicinesApp />} />
          <Route path="/models" element={<Models />} />
          <Route path="/userInfo/*" element={<UserInfoApp/>}/>
          <Route path='/artificial-doctor' element={<ArtificialDoctor/>} />
          <Route path="*" element={<Navigate to="/dashboard/home" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
