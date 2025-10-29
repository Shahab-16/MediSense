import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaVideo, FaCalendar, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import Cookies from "js-cookie"; // Import js-cookie
import {jwtDecode} from "jwt-decode";
const Sidebar = () => {
  const navigate = useNavigate();

  const token=Cookies.get('token');
  console.log("token in sidebar",token);

  let doctorName = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      doctorName = decoded.name || "";
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  doctorName = doctorName.replace(/\s+/g, "-");
  console.log("DoctorName in sidebar",doctorName);


  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout done successfully");
    setTimeout(() => {
      window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/`;
    }, 2000);
  };
  
  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-6 shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">MEDISENSE</h1>
        <h2 className="text-2xl font-semibold mt-2 text-blue-200">Doctor's Panel</h2>
        {/* Divider below the header */}
        <hr className="border-t-2 border-blue-600 mt-4 mb-6" />
      </div>
      <ul>
        <li className="mb-6">
          <Link 
            to={`/doctor/${doctorName}/dashboard`} 
            className="flex items-center text-lg hover:bg-blue-700 py-2 px-4 rounded-lg transition-all ease-in-out duration-300">
            <FaTachometerAlt className="mr-3 text-xl" /> Dashboard
          </Link>
        </li>
        <li className="mb-6">
          <Link 
            to={`/doctor/${doctorName}/patients`} 
            className="flex items-center text-lg hover:bg-blue-700 py-2 px-4 rounded-lg transition-all ease-in-out duration-300">
            <FaUsers className="mr-3 text-xl" /> Patients
          </Link>
        </li>
        <li className="mb-6">
          <Link 
            to={`/doctor/${doctorName}/appointments`} 
            className="flex items-center text-lg hover:bg-blue-700 py-2 px-4 rounded-lg transition-all ease-in-out duration-300">
            <FaCalendar className="mr-3 text-xl" /> Appointments
          </Link>
        </li>
        <li className="mb-6">
          <Link 
            to={`/doctor/${doctorName}/video-consultation`} 
            className="flex items-center text-lg hover:bg-blue-700 py-2 px-4 rounded-lg transition-all ease-in-out duration-300">
            <FaVideo className="mr-3 text-xl" /> Video Consultation
          </Link>
        </li>
        {/* Logout Button */}
        <li className="mt-auto">
          <button onClick={()=>logoutHandler()}
            className="flex items-center text-lg text-white hover:bg-blue-700 py-2 px-4 rounded-lg w-full transition-all ease-in-out duration-300">
            <FaSignOutAlt className="mr-3 text-xl" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
