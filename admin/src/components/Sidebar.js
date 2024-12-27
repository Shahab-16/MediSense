import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
const Sidebar = () => {
  const [isDoctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [isMedicinesDropdownOpen, setMedicinesDropdownOpen] = useState(false);
  return (
    <div className=" bg-white w-full md:w-1/4 lg:max-w-[20%] p-4 flex flex-col gap-4">
      <NavLink
        to="/additems"
        className="flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-200"
      >
        <img src={assets.add_icon} alt="add_icon" className="w-6 h-6" />
        <p className="text-sm md:text-base">Dashboard</p>
      </NavLink>

      <div
        onClick={() => setDoctorsDropdownOpen(!isDoctorsDropdownOpen)}
        className="flex justify-between p-2 hover:bg-blue-600 transition-all duration-500 cursor pointer"
      >
        <div className="flex items-center gap-2">
          <img src={assets.order_icon} alt="order" className="w-6 h-6" />
          <p className="text-sm md:text-base">Doctors</p>
        </div>
        <span>{isDoctorsDropdownOpen ? '▲' : '▼'}</span>
      </div>
      {isDoctorsDropdownOpen && (
        <div className="flex flex-col gap-2 ml-6 mt-2">
          <NavLink
            to="/doctors/appointments"
            className="text-sm md:p-2 text-base text-black-700 hover:bg-blue-600 transition-all duration-500"
          >
            Appointments
          </NavLink>
          <NavLink
            to="/doctors/doctors-list"
            className="text-sm md:p-2 text-base text-black-700 hover:bg-blue-600 transition-all duration-500"
          >
            Doctors List
          </NavLink>
          <NavLink
            to="/doctors/add-doctors"
            className="text-sm md:p-2 text-base text-black-700 hover:bg-blue-600 transition-all duration-500"
          >
            Add Doctor
          </NavLink>
        </div>
      )}
        <div onClick={() => setMedicinesDropdownOpen(!isMedicinesDropdownOpen)}
          className='flex justify-between p-2  hover:bg-blue-600 transition-all duration-500 cursor-pointer'>
          <div  className='flex items-center gap-2'>
          <img src={assets.order_icon} alt="order" className="w-6 h-6" />
          <p className="text-sm md:text-base">Medicines</p>
          </div>
          <span>{isMedicinesDropdownOpen ? '▲' : '▼'}</span>
        </div>
        {isMedicinesDropdownOpen && (
        <div className="flex flex-col gap-2 ml-6 mt-2">
          <NavLink
            to="/doctors/add-medicines"
            className="text-sm md:p-2 text-base text-black-700 hover:bg-blue-600 transition-all duration-500"
          >
            Add Medicines
          </NavLink>
          <NavLink
            to="/doctors/medicines-list"
            className="text-sm md:p-2 text-base text-black-700 hover:bg-blue-600 transition-all duration-500"
          >
            Medicines List
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Sidebar
