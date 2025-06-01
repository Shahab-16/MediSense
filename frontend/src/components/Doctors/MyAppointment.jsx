import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bookAppointmentAPI } from '../../services/axios';

const MyAppointment = () => {
  const { state } = useLocation(); // new booking passed through state
  const [appointments, setAppointments] = useState([]);
  const[paymentStatus,setPaymentStatus]=useState(false);
  const[status,setStatus]=useState("Not Booked");
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);

    const updateAppointmentPage = async () => {
      if (!state) return; // only run on fresh bookings
      try {
          const newAppointment = {
            docName: state.docName,
            specialization: state.specialization,
            fees: state.fees,
            success_rate: state.success_rate,
            image: state.image,
            time: state.time,
            dateTime: state.dateTime
          };

          const updatedAppointments = [...storedAppointments, newAppointment];
          setAppointments(updatedAppointments);
          localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      
      } catch (error) {
        console.log('Error booking appointment:', error.message);
      }
    };
    updateAppointmentPage();
  }, [state]);
  const proceedPayment=async()=>{
    // const paymentRes=payMentAPI();
    const  paymentRes=true;
    if(paymentRes){
      try{
        const res=await bookAppointmentAPI({
          docName:state.docName,
          dateTime:state.dateTime,
          time:state.time
        })
        alert("Booking succesfull");
        setStatus("Booked");
      } catch(error){
        console.log("error in updating the database");
      }
    }
  }
  return (
    <div className='p-4'>
      <p className='font-bold text-center mb-4 text-xl'>My Appointments</p>

      {appointments.length === 0 ? (
        <p className='text-center'>No Appointments Found</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {appointments.map((app, index) => (
            <div key={index} className='flex border p-4 rounded shadow'>
              <div className='w-[150px] h-[150px] mr-4'>
                <img src={app.image} alt='doctor' className='h-full w-full object-cover rounded' />
              </div>
              <div className='flex-1 text-sm text-[#5E5E5E]'>
                <p className='text-[#262626] text-base font-semibold'>{app.docName}</p>
                <p>{app.specialization}</p>
                <p className='mt-1'>
                  <span className='text-sm text-[#3C3C3C] font-medium'>Fee:</span> {app.fees}
                </p>
                <p className='font-semibold text-gray-600 mt-1'>Success Rate: {app.success_rate}</p>
                <p className='text-gray-500'>Date: {new Date(app.dateTime).toLocaleDateString()}</p>
                <p className='text-gray-500'>Time: {app.time}</p>
                <p className='text-gray-600'>Status: {status}</p>
              </div>
              <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                <button onClick={proceedPayment} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                  Pay Online
                </button>
                { status==="Booked" &&
                <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                  Cancel Appointment
                </button>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
