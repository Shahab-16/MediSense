// App.js
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import LoginAndSignUp from './components/LoginAndSignup/LoginAndSignup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-and-signup' element={<div className="fullscreen-container"><LoginAndSignUp /></div>} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
