import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import LoginOptions from './components/LoginAndSignup/LoginOptions'; 
import LoginForm from './components/LoginAndSignup/LoginForm';        
import Otp from './components/LoginAndSignup/Otp';
import Dashboard from './pages/Dashboard';
import MedicineOrderVerify from './pages/Medicines/MedicineOrderVerify';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Route for User/Admin login options */}
        <Route path="/login" element={
          <div className="fullscreen-container">
            <LoginOptions />
          </div>
        } />

        {/* Dynamic route for user or admin login forms */}
        <Route path="/login/:role" element={
          <div className="fullscreen-container">
            <LoginForm />
          </div>
        } />

        <Route path="/signup/verify-otp" element={
          <div className="flex items-center justify-center h-screen bg-[#2c2c2cc0]">
            <Otp />
          </div>
        } />
        
        <Route path="/dashboard/*" element={<Dashboard />} />
<Route path="/medicine/verify-order" element={<MedicineOrderVerify/>} />
      </Routes>
    </div>
  );
}

export default App;
