// Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from '../components/Dashboard/DashboardHome';
import Doctors from './Doctors';
import Medicines from './Medicines';
import Models from './Models';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="relative flex flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-16' : 'ml-16 lg:ml-80'
        } transition-all duration-300 ease-in-out p-4 overflow-y-auto h-screen`}
      >
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/models" element={<Models />} />
          <Route path="*" element={<Navigate to="/dashboard/home" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
