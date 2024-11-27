// App.js
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import LoginAndSignUp from './components/LoginAndSignup/LoginAndSignup';
import Otp from "./components/LoginAndSignup/Otp"
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-and-signup' element={<div className="fullscreen-container"><LoginAndSignUp /></div>} />
        <Route path='/otp' element={<div className="flex items-center justify-center h-screen">
          <Otp />
        </div>} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
