import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiUser, 
  FiChevronDown, 
  FiChevronUp, 
  FiInfo,
  FiSettings
} from "react-icons/fi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsListCheck, BsAward } from "react-icons/bs";
import { FaHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HospitalSidebar = () => {
  const [isDoctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [isHospitalDropdownOpen, setHospitalDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const doctorDropDownClick = () => {
    setDoctorsDropdownOpen(!isDoctorsDropdownOpen);
    navigate("/hospital/doctors");
  };

  const hospitalDropDownClick = () => {
    setHospitalDropdownOpen(!isHospitalDropdownOpen);
    navigate("/hospital/profile");
  };

  const logoutHandler = () => {
      localStorage.removeItem("token");
      toast.success("Logout done successfully");
      setTimeout(() => {
        window.location.href = "https://medisense-frontend.vercel.app/";
      }, 2000);
    };

    
  return (
    <div className="bg-white text-gray-800 w-full md:w-1/4 lg:max-w-[20%] p-6 flex flex-col gap-4 border-r shadow-md">
      <NavLink
        to="/hospital/dashboard"
        className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md transition-all duration-300"
      >
        <FiHome size={24} />
        <p className="text-lg font-semibold">Dashboard</p>
      </NavLink>

      {/* Hospital Profile Section */}
      <div
        onClick={hospitalDropDownClick}
        className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <FaHospital size={24} />
          <p className="text-lg font-semibold">Hospital Profile</p>
        </div>
        {isHospitalDropdownOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isHospitalDropdownOpen && (
        <div className="flex flex-col gap-3 ml-6 mt-2 border-l-2 border-gray-300 pl-4">
          <NavLink
            to="/hospital/information"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <FiInfo size={18} />
            <p>Hospital Information</p>
          </NavLink>
          <NavLink
            to="/hospital/achievements"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsAward size={18} />
            <p>Achievements</p>
          </NavLink>
          <NavLink
            to="/hospital/settings"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <FiSettings size={18} />
            <p>Settings</p>
          </NavLink>
        </div>
      )}

      {/* Doctors Section */}
      <div
        onClick={doctorDropDownClick}
        className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <FiUser size={24} />
          <p className="text-lg font-semibold">Doctors</p>
        </div>
        {isDoctorsDropdownOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isDoctorsDropdownOpen && (
        <div className="flex flex-col gap-3 ml-6 mt-2 border-l-2 border-gray-300 pl-4">
          <NavLink
            to="/hospital/doctors/list-doctors"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsListCheck size={18} />
            <p>Doctors List</p>
          </NavLink>
          <NavLink
            to="/hospital/:hospitalId/doctors/add-doctors"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <MdPersonAddAlt1 size={18} />
            <p>Add Doctor</p>
          </NavLink>
        </div>
      )}

      <div className="flex justify-center mt-[20%]">
        <button
          onClick={logoutHandler}
          className="w-[80%] py-2 flex items-center justify-center rounded bg-red-500 text-white text-xl font-semibold hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HospitalSidebar;