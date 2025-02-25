import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import PharmacyNavbar from './components/PharmacyNavbar';
import PharmacySidebar from './components/PharmacySidebar';
import AddMedicine from './pages/Medicines/AddMedicine';
import ListMedicines from './pages/Medicines/ListMedicines';
import OrderedMedicines from './pages/Medicines/OrderedMedicines';
import PharmacySettings from './pages/Pharmacy/Settings';
import PharmacyInformation from './pages/Pharmacy/PharmacyInformation';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <>
            <PharmacyNavbar />
            <div className="flex flex-1">
              <PharmacySidebar />
              <Routes>
                <Route path="/pharmacy/*" element={<Dashboard />} />
                <Route path="/pharmacy/medicines/list-medicines" element={<ListMedicines />} />
                <Route path="/pharmacy/medicines/add-medicine" element={<AddMedicine />} />
                <Route path="/pharmacy/medicines/ordered-medicines" element={<OrderedMedicines />} />
                <Route path="/pharmacy/settings" element={<PharmacySettings />} />
                <Route path="/pharmacy/information" element={<PharmacyInformation />} />
                <Route path="*" element={<Navigate to="/pharmacy/dashboard" />} />
              </Routes>
            </div>
          </>
    </div>
  );
};

export default App;
