import React from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../../assets/asset';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllHospitals } from '../../assets/asset';
export default function InsideHospital() {
    const navigate = useNavigate();
    const { hospitalId } = useParams();
    const [filterDoc, setFilter] = useState([]);
    const [hosInfo, setHos] = useState(null);
    useEffect(() => {
        setHos(AllHospitals.find(hos => hos.hospitalId == hospitalId));
    }, [AllHospitals, hospitalId]);
    const findDoctor = () => {
        setFilter(doctors.filter(doc => doc.hospitalId == hospitalId));
    }
    useEffect(() => {
        findDoctor();
    }, [doctors, hospitalId])
    return (
        <div className='container mx-auto px-8 py-8  flex ml-2'>
            {/* for finding doctors by specilaity */}
            <div className='flex flex-col'>
                <div className='flex flex-col text-gray gap-4'>
                <p className='border w-[170px] px-2 py-2'>General Physician</p>
                <p className='border w-[170px] px-2 py-2'>Gynecologist</p>
                <p className='border w-[170px] px-2 py-2'>Dermatologist</p>
                <p className='border w-[170px] px-2 py-2'>Pediatricians</p>
                <p className='border w-[170px] px-2 py-2'>Neurologist</p>
                </div>
            </div>
            <div className='w-full grid grid-cols-4 gap-4 gap-y-6 ml-8'>
                {filterDoc
                    .map((item, index) => (
                        <div
                            key={index}
                            className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        >
                            <img
                                onClick={() => navigate(`/dashboard/doctors/appointment/${item._id}`)}
                                className='bg-blue-100 w-full object-cover overflow-hidden'
                                src={item.img}
                                alt={item.name}
                            />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <p className='bg-green-600 rounded-full w-2 h-2'></p>
                                    <p className='text-green-600'>Available</p>
                                </div>
                            </div>
                            <p className='text-[#262626] text-lg font-medium px-4'>{item.name}</p>
                            <p className='text-[#262626] text-lg font-medium px-4'>{item.specialization}</p>
                            <p className='text-[#262626] text-lg font-medium px-4'>{hosInfo?.name}</p>
                            <p className='text-green-600 text-lg font-medium px-4'>⭐ {hosInfo?.rating || "N/A"}</p>
                        </div>
                    ))}

            </div>
        </div>
    )
}
