import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/MainSection';
import Footer from './components/Footer';
import MedisenseDescription from './components/MedisenseDescription';
import Stats from './components/Stats';
import AppCompnent from './components/AppCompnent';
import ModelSection from './components/ModelSection';
import ModelSlider from './components/ModelSlider';
import DoctorSection from './components/DoctorSection';
import MedSection from './components/MedSection';


function App() {
  return (
    <div>
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
  );
}

export default App;
