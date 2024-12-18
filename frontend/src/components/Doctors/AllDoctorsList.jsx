import React from 'react'
import { images } from '../../assets/asset'
import { doctors } from '../../assets/asset';
import DoctorCard from './DoctorCard';
import { useNavigate, useParams } from 'react-router-dom'
export default function AllDoctorsList() {
    const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 my-5 text-[#262626] md:mx-10'>
      <div className='w-full grid grid-cols-4 gap-2 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.map((item,index)=>(
            <div onClick={()=>navigate(`/dashboard/doctors/appointment/${item._id}`)} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img  className='bg-blue-100' src={item.img}></img>
                <div className='p-4'>
                    <div className='flex flex-cols gap-4 items-center text-sm text-center'>
                      <p className='bg-green-600 rounded-full w-2 h-2 mt-2'></p><p className='text-green-600'>Available</p>
                    </div>
                </div>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.name}</p>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.specialization}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
