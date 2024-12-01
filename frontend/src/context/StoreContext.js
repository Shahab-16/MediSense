// StoreContext.js
import { createContext, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false);

    const [stats, setStats] = useState({
        doctorsAvailable: 120,
        totalMedicines: 2500,
        totalModels: 10,
    });


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
