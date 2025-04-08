import React, { useEffect, useState } from 'react'
import { FaHospital } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/asset';
import { AllHospitals } from '../../assets/asset';  
import { axiosInstance } from '../../services/axios';
export default function Hospitals() {
  const navigate=useNavigate();
  const [hospitalFromDatabase,setHospital]=useState([]);
  useEffect(()=>{
    const fetchHospitals= async()=>{
      try{
        const res=await axiosInstance.get("/hospital/get-all-hospitals");
        console.log("fetched hospitals",res.data.data);
        setHospital(res.data.data);
      } catch(error){
        console.log("error in calling from frontend",error);
      }
    }
    fetchHospitals();
  },[])
  return (
    <div className="container mx-auto px-8 py-8 max-w-screen-xl">
      <div className='flex flex-col items-center text-center'>
        <img className='w-40 mb-4' src={images.health_logo} alt="Health Logo" />
        <p className='text-3xl font-bold text-blacl'>Find the Best Hospitals Near You</p>
      </div>
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {hospitalFromDatabase
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
      
      <Link to='/dashboard/doctors/allhospitals' className='block text-center text-blue-600 font-semibold mt-6 hover:underline'>View all hospitals</Link>
      
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 px-8 flex flex-col items-center rounded-lg shadow-lg">
        <FaHospital className="text-4xl mb-3" />
        <h1 className="text-2xl font-bold">Caring for You, Every Step of the Way</h1>
        <p className="text-lg mt-2">Your health, our priority. Find the best care near you.</p>
      </div>
    </div>
  )
}
