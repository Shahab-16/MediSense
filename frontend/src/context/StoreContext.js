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


    const addToMedicineCart=async(itemId,userId)=>{
        if(!medicineCart[itemId]){
            setMedicineCart(prev=>({...prev,[itemId]:1}));
        }
        else if(medicineCart[itemId]>=1){
            setMedicineCart(prev=>({...prev,[itemId]:prev[itemId]+1}));
        }
        console.log("Printing the userId in storeContext in addMedicineToCart",userId);
        if(token){
            await axios.post(`${BACKEND_URL}/user/medicine/add-to-cart`,{medicineId:itemId,userId:userId},{headers:{Authorization:`Bearer ${token}`}});
        }
    }

    const removeFromMedicineCart=async(itemId,userId)=>{
        console.log("Printing the userId and itemId in storeContext in removeFromMedicineCart",userId," ",itemId);
        if(medicineCart[itemId]>=1){
            setMedicineCart(prev=>({...prev,[itemId]:prev[itemId]-1}));
        }
        if(token){
            await axios.post(`${BACKEND_URL}/user/medicine/remove-from-cart`,{medicineId:itemId,userId:userId},{headers:{Authorization:`Bearer ${token}`}});
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
        setToken,
        BACKEND_URL
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;