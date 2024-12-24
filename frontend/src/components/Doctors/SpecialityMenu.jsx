import React from 'react'
import { Link } from 'react-router-dom'
import { speciality_data } from '../../assets/asset'
const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col justify-center gap-5'>
      <h1 className='text-center font-semibold text-4xl'>Find By Speciality</h1>
      <p className=' text-center'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className='flex gap-14 justify-center'>
        {speciality_data.map((item,index)=>(
          <Link to ={`/dashboard/doctors/alldoctors/${item.speciality}`} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
            <img className='w-16 sm:w-24 mb-2 ' src={item.image}></img>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
