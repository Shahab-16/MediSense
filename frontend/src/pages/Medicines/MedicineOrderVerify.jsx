import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { BACKEND_URL } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      console.log("Verifying medicine order:", success, orderId);
      const response = await axios.post(`${BACKEND_URL}/user/medicine/verify-order`, { success, orderId });
      console.log("Medicine order verification response:", response.data);

      navigate("/dashboard/userInfo/my-ordered-medicines");
    } catch (error) {
      console.error("Error verifying medicine order:", error);
      navigate("/dashboard/medicines");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Verify;
