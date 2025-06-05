import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  MdOutlineMedication,
  MdPersonAddAlt1,
  MdOutlineEventNote,
} from "react-icons/md";
import { BsClipboardData, BsListCheck, BsBoxArrowInDown } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isDoctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [isMedicinesDropdownOpen, setMedicinesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const hospitalDropDownClick = () => {
    setDoctorsDropdownOpen(!isDoctorsDropdownOpen);
    navigate("/admin/hospital");
  };

  const pharmacyDropDownClick = () => {
    setMedicinesDropdownOpen(!isMedicinesDropdownOpen);
    navigate("/admin/pharmacy");
  };

const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout done successfully");
    setTimeout(() => {
      window.location.href = "http://localhost:3000/";  
    }, 2000);
  };

  return (
    <div className="bg-white text-gray-800 w-full md:w-1/4 lg:max-w-[20%] p-6 flex flex-col gap-4 border-r shadow-md">
      <NavLink
        to="/additems"
        className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md transition-all duration-300"
      >
        <FiHome size={24} />
        <p className="text-lg font-semibold">Dashboard</p>
      </NavLink>

      {/* Doctors Section */}
      <div
        onClick={() => hospitalDropDownClick()}
        className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <FiUser size={24} />
          <p className="text-lg font-semibold">Hospital</p>
        </div>
        {isDoctorsDropdownOpen ? (
          <FiChevronUp size={20} />
        ) : (
          <FiChevronDown size={20} />
        )}
      </div>
      {isDoctorsDropdownOpen && (
        <div className="flex flex-col gap-3 ml-6 mt-2 border-l-2 border-gray-300 pl-4">
          <NavLink
            to="/admin/hospital/total-hospitals-info"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <MdOutlineEventNote size={18} />
            <p>Hospital Info</p>
          </NavLink>
          <NavLink
            to="/admin/hospital/list-hospitals"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsListCheck size={18} />
            <p>Hospital List</p>
          </NavLink>
          <NavLink
            to="/admin/hospital/add-hospital"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <MdPersonAddAlt1 size={18} />
            <p>Add Hospital</p>
          </NavLink>
        </div>
      )}

      {/* Medicines Section */}
      <div
        onClick={() => pharmacyDropDownClick()}
        className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <MdOutlineMedication size={24} />
          <p className="text-lg font-semibold">Pharmacy</p>
        </div>
        {isMedicinesDropdownOpen ? (
          <FiChevronUp size={20} />
        ) : (
          <FiChevronDown size={20} />
        )}
      </div>
      {isMedicinesDropdownOpen && (
        <div className="flex flex-col gap-3 ml-6 mt-2 border-l-2 border-gray-300 pl-4">
          <NavLink
            to="/admin/pharmacy/add-pharmacy"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsBoxArrowInDown size={18} />
            <p>Add Pharmacy</p>
          </NavLink>
          <NavLink
            to="/admin/pharmacy/list-all-pharmacies"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <FaRegListAlt size={18} />
            <p>Pharmacy List</p>
          </NavLink>
          <NavLink
            to="/admin/pharmacy/total-pharmacies-info"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsClipboardData size={18} />
            <p>Pharmacy Info</p>
          </NavLink>
        </div>
      )}
      <div className="flex justify-center">
      <button
        onClick={() => logoutHandler()}
        className="w-[80%] py-2 flex items-center justify-center rounded bg-red-500 text-white text-xl font-semibold hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
      </div>
      
    </div>
  );
};

export default Sidebar;
