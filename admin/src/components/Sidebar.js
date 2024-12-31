import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdOutlineMedication, MdPersonAddAlt1, MdOutlineEventNote } from 'react-icons/md';
import { BsClipboardData, BsListCheck, BsBoxArrowInDown } from 'react-icons/bs';
import { FaRegListAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isDoctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [isMedicinesDropdownOpen, setMedicinesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const doctorDropDownClick = () => {
    setDoctorsDropdownOpen(!isDoctorsDropdownOpen);
    navigate('/admin/doctors');
  };

  const medicineDropDownClick = () => {
    setMedicinesDropdownOpen(!isMedicinesDropdownOpen);
    navigate('/admin/medicines');
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
        onClick={() => doctorDropDownClick()}
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
            to="/admin/doctors/appointments"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <MdOutlineEventNote size={18} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/admin/doctors/doctor-list"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsListCheck size={18} />
            <p>Doctors List</p>
          </NavLink>
          <NavLink
            to="/admin/doctors/add-doctors"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <MdPersonAddAlt1 size={18} />
            <p>Add Doctor</p>
          </NavLink>
        </div>
      )}

      {/* Medicines Section */}
      <div
        onClick={() => medicineDropDownClick()}
        className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <MdOutlineMedication size={24} />
          <p className="text-lg font-semibold">Medicines</p>
        </div>
        {isMedicinesDropdownOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isMedicinesDropdownOpen && (
        <div className="flex flex-col gap-3 ml-6 mt-2 border-l-2 border-gray-300 pl-4">
          <NavLink
            to="/admin/medicines/add-medicines"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsBoxArrowInDown size={18} />
            <p>Add Medicines</p>
          </NavLink>
          <NavLink
            to="/admin/medicines/medicine-list"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <FaRegListAlt size={18} />
            <p>Medicines List</p>
          </NavLink>
          <NavLink
            to="/admin/medicines/ordered-medicines"
            className="flex items-center gap-3 text-base text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            <BsClipboardData size={18} />
            <p>Ordered Medicines</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;