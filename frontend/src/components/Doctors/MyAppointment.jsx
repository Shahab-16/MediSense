import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doctors } from '../../assets/asset'
const PaymentCard=()=>{
  const {docId}=useParams();
  const [docInfo,setDocInfo]=useState(null);
  const fetchInfo=()=>{
    const docInfo=doctors.find(doc=>doc._id==docId)
    setDocInfo(docInfo);
  }
  useEffect(()=>{
    fetchInfo();
  },[doctors,docId])
  return docInfo && (
    <div className='flex'>
      <div className='bg-blue-300 ml-[5%]'>
         <img className='h-[150px] w-[150px]' src={docInfo.img}></img>
      </div>
      <div className='flex-1 text-sm text-[#5E5E5E] ml-[2%]'>
         <p className='text-[#262626] text-base font-semibold'>{docInfo.name}</p>
         <p className=''>{docInfo.specialization}</p>
         <p className='text-[#464646] font-medium mt-1'>Address:</p>
         <p>{docInfo.address}</p>
         <p className=' mt-1'>
          <span className=' text-sm text-[#3C3C3C] font-medium'>Fee:</span>
          {docInfo.fee}
         </p>
         <p className='font-semibold text-gray-600 mt-1'>Success Rate:</p>
         <p>{docInfo.success_rate}</p>
      </div>
      <div className='flex flex-col gap-2 justify-end text-sm text-center'>
       <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
       <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Payment</button>
      </div>
    </div>
  )
}
const MyAppointment = () => {
  return (
    <div>
      <p className='font-bold text-center mt-2'>My Appointments</p>
      <div className='mt-9'>
      <PaymentCard/>
      </div>
    </div>
  )
}

export default MyAppointment
