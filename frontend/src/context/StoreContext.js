// StoreContext.js
import { createContext, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    
    const [login, setLogin] = useState(false);

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
    }

    const removeFromMedicineCart=async(itemId)=>{
        if(medicineCart[itemId]>=1){
            setMedicineCart(prev=>({...prev,[itemId]:prev[itemId]-1}));
        }
    }


    const contextValue = {
        stats,
        setStats,
        login,
        setLogin,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
