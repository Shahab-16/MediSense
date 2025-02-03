import React from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../../assets/asset';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function InsideHospital() {
    const navigate=useNavigate();
    const { hospitalId } = useParams();
    const [filterDoc, setFilter] = useState([]);
    const findDoctor = () => {
        setFilter(doctors.filter(doc => doc.hospitalId == hospitalId));
    }
    useEffect(() => {
        findDoctor();
    }, [doctors, hospitalId])
    return (
        <div className='container mx-auto px-8 py-8'>
        <div className='w-full grid grid-cols-4 gap-4 gap-y-6'>
        {filterDoc.map((item,index)=>(
            <div className=' border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img onClick={()=>navigate(`/dashboard/doctors/appointment/${item._id}`)}  className='bg-blue-100' src={item.img}></img>
                <div className='p-4'>
                    <div className='flex flex-cols gap-4 items-center text-sm text-center'>
                      <p className='bg-green-600 rounded-full w-2 h-2 mt-2'></p><p className='text-green-600'>Available</p>
                    </div>
                </div>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.name}</p>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.specialization}</p>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.hospitalName}</p>
                <p className='text-green-600 text-lg font-medium px-4'>⭐ 4.5</p>
            </div>
        ))}
      </div>
        </div>
    )
}
