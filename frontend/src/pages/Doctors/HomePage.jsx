import React from 'react';
import DoctorsIntro from '../../components/Doctors/DoctorsIntro';
import Speciality from '../../components/Doctors/Speciality';
import DoctorsList from '../../components/Doctors/DoctorsList';
import { useState } from 'react';
const Doctors = () => {
  const [specialization, setSpecialization] = useState('ALL');
  return (
    <div className='flex flex-col gap-8'>
      <DoctorsIntro/>
      <Speciality specialization={specialization} setSpecialization={setSpecialization}/>
      <DoctorsList specialization={specialization}/>
    </div>
  )
};

export default Doctors;
