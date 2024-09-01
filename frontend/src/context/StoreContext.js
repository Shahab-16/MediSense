import { createContext,useState } from "react";

export const StoreContext = createContext()


const StoreContextProvider = (props) => {

    const [login,setlogin]=useState(false)

    const [stats, setStats] = useState({
        doctorsAvailable: 120,
        totalMedicines: 2500,
        totalModels: 10,
    });

    const contextvalue = {
        stats,
        setStats,
        login,
        setlogin,
    }
    return (
    <StoreContext.Provider value={contextvalue}>
    {props.children}
    </StoreContext.Provider>
    )
}


export default StoreContextProvider;