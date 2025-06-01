import React, { useState } from 'react'
import { images } from '../../assets/asset'
import { doctors } from '../../assets/asset';
import DoctorCard from './DoctorCard';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../services/axios';
import { getDoctors } from '../../services/axios';
import { useContext } from 'react';
import  { StoreContext } from '../../context/StoreContext';
export default function AllDoctorsList() {
    const {selectedDoctors,setSelectedDoctors}=useContext(StoreContext);
    const {speciality}=useParams();
    const navigate=useNavigate();
    const [filterDoc,setFilterDoc]=useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
       useEffect(() => {
         const fetchDoctors = async () => {
           try {
             const res = await getDoctors();
             console.log("Fetched doctors:", res);
             setAllDoctors(res);
           } catch (error) {
             console.error("Error fetching doctors", error);
           }
         };
         fetchDoctors();
       }, []);
    const applyFilter=()=> {
      if(speciality){
        setFilterDoc(allDoctors.filter(doc=>doc.specialization==speciality))
      }
      else{
        setFilterDoc(allDoctors);
      }
    }
    useEffect(()=>{
      applyFilter();
    },[allDoctors,speciality])
  return (
    <div className='ml-[8%]'>
      <p>
        Browse through the doctors specialist
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col text-gray-500 text-lg gap-4'>
          <p onClick={()=>speciality==='General physician'   ? navigate('/dashboard/doctors/alldoctors') : navigate('/dashboard/doctors/alldoctors/General physician')} className={`border w-[170px] p-1 cursor-pointer  ${speciality==="General physician" ? "bg-indigo-50" :""}`}>General Physician</p>
          <p onClick={()=>speciality==='Gynecologist' ?navigate('/dashboard/doctors/alldoctors') : navigate('/dashboard/doctors/alldoctors/Gynecologist')} className={`border w-[170px] p-1 cursor-pointer  ${speciality==="Gynecologist" ? "bg-indigo-50" :""}`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist' ?navigate('/dashboard/doctors/alldoctors') : navigate('/dashboard/doctors/alldoctors/Dermatologist')} className={`border w-[170px] p-1 cursor-pointer ${speciality==="Dermatologist" ? "bg-indigo-50" :""} `}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatrician' ?navigate('/dashboard/doctors/alldoctors') : navigate('/dashboard/doctors/alldoctors/Pediatrician')} className={`border w-[170px] p-1 cursor-pointer  ${speciality==="Pediatrician" ? "bg-indigo-50" :""}`}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist' ?navigate('/dashboard/doctors/alldoctors') : navigate('/dashboard/doctors/alldoctors/Neurologist')} className={`border w-[170px] p-1 cursor-pointer  ${speciality==="Neurologist" ? "bg-indigo-50" :""}`}>Neurologist</p>
        </div>
      <div className='w-full grid grid-cols-4 gap-4 gap-y-6'>
        {filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/dashboard/doctors/appointment/${item.name}`)}  className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img    className='bg-blue-100' src={item.profileImage}></img>
                <div className='p-4'>
                    <div className='flex flex-cols gap-4 items-center text-sm text-center'>
                      <p className='bg-green-600 rounded-full w-2 h-2 mt-2'></p><p className='text-green-600'>Available</p>
                    </div>
                </div>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.name}</p>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.specialization}</p>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.hospitalName}</p>
                <p className='text-[#262626] text-lg font-medium px-4'>{item.rating}</p>
            </div>
        ))}
      </div>
      </div>
    </div>
  )
}
