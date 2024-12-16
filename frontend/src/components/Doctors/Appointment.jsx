import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../../assets/asset';
const Appointment = () => {
    const {docId}=useParams();
    const [docInfo,setDocInfo]=useState(null);
    const fetchDocInfo= async ()=>{
        const docInfo=doctors.find(doc=>doc._id==docId);
        setDocInfo(docInfo);
        console.log(docInfo);
    }
    useEffect(()=>{
        fetchDocInfo();
    },[doctors,docId]);
  return docInfo && (
    <div className='flex flex-col sm:flex-row gap-4 mx-[10%]'>
        <div>
           <img  className='bg-blue-600 w-full sm:max-w-72 rounded-lg' src = {docInfo.img}></img>
        </div>
        <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-5 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name}</p>
            <div className='flex items-center gap-2 text-xl font-medium text-gray-700'>
                <p className='text-gray-600'>{docInfo.specialization}</p>
                <button className='border rounded-xl text-sm text-center'>{docInfo.experience} Years</button>
            </div>
            <div>
                <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About </p>
                <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-gray-600 font-medium mt-4'>Appointment Fee
                <span className='text-gray-800'>${docInfo.fee}</span>
            </p>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Appointment
