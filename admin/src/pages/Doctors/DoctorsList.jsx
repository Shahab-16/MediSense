import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { doctors } from '../../assets/admin_assets/assets'
const DoctorsList = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-4 m-2'>
      {doctors.map((item,index)=>(
        <div className='border border-[#C9D8FF] rounded-xl max-w-65 overflow-hidden cursor-pointer group'>
          <img className='bg-blue-100 w- hover:bg-blue-600 transition-all duration-500' src={item.img}></img>
          <p className='font-semibold'>{item.name}</p>
          <p className='text-gray-600'>{item.specialization}</p>
          <p className='text-green-600'>Available</p>
        </div>
      ))}
    </div>
  )
}

export default DoctorsList
