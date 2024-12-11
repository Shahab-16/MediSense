import React from 'react';
import DoctorsIntro from '../../components/Doctors/DoctorsIntro';
import Speciality from '../../components/Doctors/Speciality';
import DoctorsList from '../../components/Doctors/DoctorsList';
import Footer from '../../components/Doctors/Footer';
import DoctorsNavbar from '../../components/Doctors/DoctorsNavbar';
const Doctors = () => {
  return (
    <div className='flex flex-col gap-8'>
      <DoctorsIntro/>
      <Speciality/>
      <DoctorsList/>
    </div>
  )
};

export default Doctors;
