import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';
import Login from './components/Login';

function App() {
  const {login,setlogin}=useContext(StoreContext)
  return (
    <>
      {login ? (<Login/>) : (<></>)}
      <div className='min-h-screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
    
  );
}

export default App;
