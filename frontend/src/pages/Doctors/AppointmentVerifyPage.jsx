import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const AppointmentVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");
  const navigate = useNavigate();
  const { BACKEND_URL } = useContext(StoreContext);

  const verifyAppointmentPayment = async () => {
    try {
      console.log("Verifying appointment:", success, appointmentId);
      const response = await axios.get(`${BACKEND_URL}/user/doctors/verify-appointment`, {
        params: { success, appointmentId }
      });
      console.log("Appointment verification response:", response.data);

      navigate("/dashboard/userInfo/my-appointments");
    } catch (error) {
      console.error("Error verifying appointment:", error);
      navigate("/dashboard/appointments");
    }
  };

  useEffect(() => {
    verifyAppointmentPayment();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default AppointmentVerifyPage;
