import React from 'react'
import AllDoctorsList from '../../components/Doctors/AllDoctorsList'
const DoctorsListPage = () => {
  return (
    <div className='flex'>
      <div className='mt-[3%]'>
      <p className='p-2'>Browse through the doctors specialist.</p>
        <p className='border p-2 rounded-md font-outfit m-2 cursor-pointer'>General physician</p>
        <p className='border p-2 rounded-md font-outfit m-2 cursor-pointer'>Dermatologist</p>
        <p className='border p-2 rounded-md font-outfit m-2 cursor-pointer'>Pediatricians</p>
        <p className='border p-2 rounded-md font-outfit m-2 cursor-pointer'>Neurologist</p>
        <p className='border p-2 rounded-md font-outfit m-2 cursor-pointer'>Gastroenterologist</p>
      </div>
      <div className='mt-[3%]'>
        <AllDoctorsList/>
      </div>
    </div>
  )
}

export default DoctorsListPage
