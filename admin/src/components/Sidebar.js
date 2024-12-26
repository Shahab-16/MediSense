import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-full md:w-1/4 lg:max-w-[20%] p-4 flex flex-col gap-4 border-r border-[#241919]">
      <NavLink
        to="/additems"
        className="flex items-center gap-2 border border-[#241919] p-2 hover:bg-gray-100 transition-all duration-200"
      >
        <img src={assets.add_icon} alt="add_icon" className="w-6 h-6" />
        <p className="text-sm md:text-base">Add Items</p>
      </NavLink>

      <NavLink
        to="/listitems"
        className="flex items-center gap-2 border border-[#241919] p-2 hover:bg-gray-100 transition-all duration-200"
      >
        <img src={assets.order_icon} alt="order" className="w-6 h-6" />
        <p className="text-sm md:text-base">List Items</p>
      </NavLink>

      <NavLink
        to="/orders"
        className="flex items-center gap-2 border border-[#241919] p-2 hover:bg-gray-100 transition-all duration-200"
      >
        <img src={assets.order_icon} alt="order" className="w-6 h-6" />
        <p className="text-sm md:text-base">Orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
