import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HospitalAchievements from './pages/Hospital/HospitalAchievements';
import HospitalInformation from './pages/Hospital/HospitalInformation';
import HospitalSettings from './pages/Hospital/HospitalSettings';
import AddDoctors from './pages/Doctor/AddDoctor';
import ListDoctors from './pages/Doctor/ListDoctors';

// Hospital Components
import HospitalNavbar from './components/Hospital/AdminNavbar';
import HospitalSidebar from './components/Hospital/AdminSidebar';
import Dashboard from './components/Hospital/Dashboard';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <>
            <HospitalNavbar />
            <div className="flex flex-1">
              <HospitalSidebar />
              <Routes>
                <Route path="/hospital/*" element={<Dashboard />} />
                <Route path="/hospital/information" element={<HospitalInformation />} />
                <Route path="/hospital/achievements" element={<HospitalAchievements />} />
                <Route path="/hospital/settings" element={<HospitalSettings />} />
                <Route path="/hospital/doctors/list-doctors" element={<ListDoctors />} />
                <Route path="/hospital/doctors/add-doctors" element={<AddDoctors />} />
                <Route path="*" element={<Navigate to="/hospital/dashboard" />} />
              </Routes>
            </div>
          </>
    </div>
  );
};

export default App;
