import React from 'react'
import { FaHospital } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/asset';
import { AllHospitals } from '../../assets/asset';  
import { getAllHopitals } from '../../services/axios';
import { useState,useEffect } from 'react';
export default function Hospitals() {
  const navigate=useNavigate();
  const [allhospitals,setAllHospitals]=useState([]);
    useEffect(()=>{
      const fetchHospitals= async()=>{
        try{
          const res=await getAllHopitals();
          console.log("fetched hospitals",res);
          setAllHospitals(res);
        } catch(error){
          console.log("error in calling from frontend",error);
        }
      }
      fetchHospitals();
    },[])
  return (
    <div className="container mx-auto px-8 py-8 max-w-screen-xl">
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {allhospitals
        .map((hospital) => (
          <div key={hospital.id} className='bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:cursor-pointer'>
            <Link to={`/dashboard/doctors/hospital/${hospital.name}`}>
            <img  src={hospital.hospitalImage} alt={hospital.name} className="h-48 w-full object-cover " />
            </Link>
            <div className='p-4'>
              <h2 className='text-xl font-bold text-gray-800'>{hospital.name}</h2>
              <p className='text-gray-600'>{hospital.address}</p>
              <p className='text-gray-500'>{hospital.contact}</p>
              <p className='text-green-600 font-semibold'>⭐ {hospital.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
