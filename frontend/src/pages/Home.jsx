import React from 'react';
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
import { ServiceCards } from '../components/HomePage/ServiceCards';
import { ConsultationType } from '../components/HomePage/ConsultationType';
import { FeaturedHospitals } from '../components/HomePage/FeaturedHospitals';

const Home = () => {
  return (
    <>
      <div className='flex flex-col max-w-[1400px] mx-auto gap-6'>
        <Navbar/>
        <HeroSection/>
        <MedisenseDescription/>
        <ServiceCards/>
        <Stats/>
        <FeaturedHospitals/>
        <DoctorSection/>
        <ConsultationType/>
        <MedSection/>
        <ModelSection/>
        <ModelSlider/>
        <AppCompnent/>
      </div>
      <Footer/>
    </>
  )
}

export default Home;