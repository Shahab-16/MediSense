import React from 'react'
import MedisenseDescription from '../components/HomePage/MedisenseDescription';
import Stats from '../components/HomePage/Stats';
import AppCompnent from '../components/HomePage/AppCompnent';
import ModelSection from '../components/HomePage/ModelSection';
import ModelSlider from '../components/HomePage/ModelSlider';
import DoctorSection from '../components/HomePage/DoctorSection';
import MedSection from '../components/HomePage/MedSection';
import HeroSection from '../components/HomePage/MainSection';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const Home = () => {
  return (
    <div className='max-w-[1400px] mx-auto'>
      <Navbar/>
      <HeroSection/>
      <MedisenseDescription/>
      <Stats/>
      <DoctorSection/>
      <MedSection/>
      <ModelSection/>
      <ModelSlider/>
      <AppCompnent/>
      <Footer/>
    </div>
  )
}

export default Home
