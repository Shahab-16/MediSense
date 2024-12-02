import React from 'react';
import DoctorsNavbar from '../components/Doctors/DoctorsNavbar';
import DoctorsIntro from '../components/Doctors/DoctorsIntro';
const Doctors = () => {
  return (
    <div className='flex flex-col gap-8'>
      <DoctorsNavbar/>
      <DoctorsIntro/>
    </div>
  )
};

export default Doctors;
