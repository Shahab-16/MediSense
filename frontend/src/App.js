import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/MainSection';
import Footer from './components/Footer';
import MedisenseDescription from './components/MedisenseDescription';
import Stats from './components/Stats';
import AppCompnent from './components/AppCompnent';


function App() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <MedisenseDescription/>
      <Stats/>
      <AppCompnent/>
      <Footer/>
    </div>
  );
}

export default App;
