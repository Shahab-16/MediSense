import React from 'react'
import MedisenseDescription from '../components/MedisenseDescription';
import Stats from '../components/Stats';
import AppCompnent from '../components/AppCompnent';
import ModelSection from '../components/ModelSection';
import ModelSlider from '../components/ModelSlider';
import DoctorSection from '../components/DoctorSection';
import MedSection from '../components/MedSection';
import HeroSection from '../components/MainSection';

const Home = () => {
  return (
    <div className='max-w-[1400px] mx-auto'>
      <HeroSection/>
      <MedisenseDescription/>
      <Stats/>
      <DoctorSection/>
      <MedSection/>
      <ModelSection/>
      <ModelSlider/>
      <AppCompnent/>
    </div>
  )
}

export default Home
