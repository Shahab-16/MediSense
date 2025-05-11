import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();
    const {BACKEND_URL} = useContext(StoreContext);

    const verifyPayment = async () => {
        try {
            console.log("verifyPayment in Verify page",success, orderId);
            //const token = localStorage.getItem("token");
            const response = await axios.post(`${BACKEND_URL}/user/medicine/verify-order`, { success, orderId });//,{headers: {token:token,}});
            console.log("verifyPaymenByBackend in Verify page",response.data);
            if (response.data.success) {
                navigate("/dashboard/userInfo/my-ordered-medicines");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment in pages:", error);
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);
    
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='spinner'>
                {/* You can add a loading spinner here */}
            </div>
        </div>
    );
}

export default Verify;