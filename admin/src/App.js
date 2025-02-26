import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/AdminDashboard/Dashboard";
import { Navigate } from "react-router-dom";
import AddPharmacy from "./pages/Pharmacy/AddPharmacy";
import ListPharmacies from "./pages/Pharmacy/ListAllPharmacy";
import PharmacyDashboard from "./pages/Pharmacy/PharmacyDashboard";
import TotalPharmaciesInfo from "./pages/Pharmacy/TotalPharmacyInfo";
import AddHospital from "./pages/Hospital/AddHospital"; 
import HospitalsList from "./pages/Hospital/HospitalsList";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard";
import TotalHospitalsInfo from "./pages/Hospital/TotalHospitalsInfo";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      {/* <ToastContainer/> */}
      <hr></hr>
      <div className="flex flex-1">
        <Sidebar/>
        <Routes>
          <Route path="/admin/*" element={<Dashboard/>}/>
          <Route path="/admin/hospital" element={<HospitalDashboard/>}/>
          <Route path="/admin/pharmacy" element={<PharmacyDashboard/>}/>
          <Route path="/admin/hospital/add-hospital" element={<AddHospital/>}/> 
          <Route path="/admin/hospital/list-hospitals" element={<HospitalsList/>}/>
          <Route path="/admin/hospital/total-hospitals-info" element={<TotalHospitalsInfo/>}/>
          <Route path="/admin/pharmacy/add-pharmacy" element={<AddPharmacy/>}/>
          <Route path="/admin/pharmacy/list-all-pharmacies" element={<ListPharmacies/>}/>
          <Route path='/admin/pharmacy/total-pharmacies-info' element={<TotalPharmaciesInfo/>}/>
          <Route path="*" element={<Navigate to="/admin" />}/>
        </Routes>
      </div>
      {/* jkbaksbdvkasj */}
    </div>
  );
}

export default App;
