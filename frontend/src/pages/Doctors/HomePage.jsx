import React from 'react';
import DoctorsNavbar from '../../components/Doctors/DoctorsNavbar';
import DoctorsIntro from '../../components/Doctors/DoctorsIntro';
import Speciality from '../../components/Doctors/Speciality';
import DoctorsList from '../../components/Doctors/DoctorsList';
const Doctors = () => {
  return (
    <div className='flex flex-col gap-8'>
      <DoctorsNavbar/>
      <DoctorsIntro/>
      <Speciality/>
      <DoctorsList/>
    </div>
  )
};

export default Doctors;
