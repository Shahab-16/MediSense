import React from 'react'
import { images } from '../../assets/asset'
import { FiSearch } from 'react-icons/fi'
import { FaCartPlus } from "react-icons/fa6";

const MedicineNavbar = () => {
  return (
    <div className='flex justify-between items-center w-[90%] mx-auto'>
    <div className='flex justify-center items-center gap-2'>
      <img src={images.medicineShopIcon} alt="logo" className='w-8 h-8' />
      <p className='text-3xl text-blue-700 text-center font-bold'>Medicine Store</p>
    </div>
    <div className='flex justify-center items-center gap-4'>
    <div className="relative w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4 pr-10 text-gray-700 bg-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          aria-label="Search"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>
      <FaCartPlus className='w-8 h-8 text-blue-800'/>
      </div>
    </div>
  )
}

export default MedicineNavbar
