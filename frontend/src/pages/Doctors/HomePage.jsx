import React from 'react';
import DoctorsIntro from '../../components/Doctors/DoctorsIntro';
import Speciality from '../../components/Doctors/Speciality';
import { useState } from 'react';
import TopDoctors from '../../components/Doctors/TopDoctors';
import SpecialityMenu from '../../components/Doctors/SpecialityMenu';
import Hospitals from '../../components/Doctors/Hospitals';
const Doctors = () => {
  const [specialization, setSpecialization] = useState('ALL');
  return (
    <div className='flex flex-col gap-8'>
      <DoctorsIntro/>
      <Hospitals/>
      <SpecialityMenu/>
      {/* <Speciality specialization={specialization} setSpecialization={setSpecialization}/> */}
      <TopDoctors/>
      {/* <DoctorsList specialization={specialization}/> */}
    </div>
  )
};

export default Doctors;
