import { createContext, useState } from "react";
import { doctors } from "../assets/asset";
import axios from "axios";
export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    const BACKEND_URL = "https://medisense-backend.vercel.app"; 
    const [login, setLogin] = useState(false);
    const [token,setToken]=useState("");
    const [loading, setLoading] = useState(false);

    const [stats, setStats] = useState({
        doctorsAvailable: 120,
        totalMedicines: 2500,
        totalModels: 10,
    });

    const [medicineCart,setMedicineCart] = useState([]);


    const addToMedicineCart=async(itemId)=>{
        if(!medicineCart[itemId]){
            setMedicineCart(prev=>({...prev,[itemId]:1}));
        }
        else if(medicineCart[itemId]>=1){
            setMedicineCart(prev=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(`${BACKEND_URL}/user/medicines/add-to-cart`,{medicineId:itemId},{headers:{Authorization:`Bearer ${token}`}});
        }
    }

    const removeFromMedicineCart=async(itemId)=>{
        if(medicineCart[itemId]>=1){
            setMedicineCart(prev=>({...prev,[itemId]:prev[itemId]-1}));
        }
    }

    const contextValue = {
        doctors,
        stats,
        setStats,
        login,
        setLogin,
        loading,
        setLoading,
        addToMedicineCart,
        removeFromMedicineCart,
        medicineCart,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;