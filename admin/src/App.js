import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddItems from "./pages/AddItems";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <Route path="/additems" element={<AddItems/>}/>
          <Route path="/listitems" element={<ListItems/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
      {/* jkbaksbdvkasj */}
    </div>
  );
}

export default App;
