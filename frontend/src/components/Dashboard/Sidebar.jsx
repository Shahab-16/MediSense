// Sidebar.jsx
import React, { useState } from 'react';
import { images } from '../../assets/asset';
import { FaHome, FaUserCircle, FaUserMd, FaPills, FaCogs, FaCube, FaStethoscope, FaTachometerAlt } from 'react-icons/fa';
import { BsChevronLeft, BsChevronRight,BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigateHome = () => {
    navigate("/");  
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-full min-h-screen">
      {/* Fixed Blue Bar with Toggle Button */}
      <div
  className={`fixed bg-blue-800 h-screen sm:h-auto w-16 flex flex-col items-center gap-2 py-4`}
>
  {/* Toggle Button */}
  <button 
    onClick={toggleSidebar}
    className="text-white mb-4 p-2 rounded hover:bg-blue-800 flex items-center"
  >
    {/* Three Dots on Phone Screens */}
    <BsThreeDots className="block sm:hidden text-2xl text-black" />
    
    {/* Arrow Icons on Larger Screens */}
    {isOpen ? (
      <BsChevronLeft className="hidden sm:block text-2xl h-screen mt-0" />
    ) : (
      <BsChevronRight className="hidden sm:block text-2xl h-screen" />
    )}
  </button>
</div>  


      {/* Sidebar Content */}
      {isOpen && (
        <div className="absolute left-16 w-64 min-h-screen bg-gray-100 text-black flex flex-col justify-between shadow-lg shadow-blue-900 z-10">
          <div className="p-4">
            <div className="flex justify-between items-center bg-slate-300 rounded-lg p-2 mb-8">
              <h1 className="text-blue-900 text-2xl font-bold text-center mb-2">MEDISENSE</h1>
              <FaStethoscope className="text-blue-900 text-2xl" />
            </div>

            <div className="space-y-4">
              <button onClick={() => navigate('/dashboard/home')} className="w-full py-2 flex items-center rounded hover:bg-blue-700 px-4">
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </button>

              <button onClick={() => navigate('/dashboard/doctors')} className="w-full py-2 flex items-center rounded hover:bg-blue-700 px-4">
                <FaUserMd className="mr-3" />
                Doctors
              </button>

              <button onClick={() => navigate('/dashboard/medicines')} className="w-full py-2 flex items-center rounded hover:bg-blue-700 px-4">
                <FaPills className="mr-3" />
                Medicines
              </button>

              <button onClick={() => navigate('/dashboard/models')} className="w-full py-2 flex items-center rounded hover:bg-blue-700 px-4">
                <FaCube className="mr-3" />
                Models
              </button>
              <button
                onClick={() => logoutHandler() } // Replace with your logout logic
                className="w-full py-2 flex items-center justify-center rounded bg-red-500 text-white font-semibold hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-4">
            <img src={images.sidebarImg} alt="Sidebar Bottom" className="w-full rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
