import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/AdminDashboard/Dashboard";
import { Navigate } from "react-router-dom";
import DoctorDashboard from "./pages/Doctors/DoctorDashboard";
import MedicineDashboard from "./pages/Medicines/MedicineDashboard";
import Appointment from "./pages/Doctors/Appointment";
import DoctorsList from "./pages/Doctors/DoctorsList";
import ListMedicines from "./pages/Medicines/ListMedicines";
import OrderedMedicines from "./pages/Medicines/OrderedMedicines";
import AddMedicine from "./pages/Medicines/AddMedicine";
import AddDoctors from "./pages/Doctors/AddDoctors";


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
          <Route path="/admin/doctors" element={<DoctorDashboard/>}/>
          <Route path="/admin/medicines" element={<MedicineDashboard/>}/>
          <Route path="/admin/doctors/add-doctors" element={<AddDoctors/>}/> 
          <Route path="/admin/doctors/doctor-list" element={<DoctorsList/>}/>
          <Route path="/admin/doctors/appointments" element={<Appointment/>}/>
          <Route path="/admin/medicines/add-medicines" element={<AddMedicine/>}/>
          <Route path="/admin/medicines/medicine-list" element={<ListMedicines/>}/>
          <Route path="/admin/medicines/orders" element={<OrderedMedicines/>}/>
          <Route path="*" element={<Navigate to="/admin" />}/>
        </Routes>
      </div>
      {/* jkbaksbdvkasj */}
    </div>
  );
}

export default App;
