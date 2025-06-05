import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { bookAppointmentAPI } from "../../services/axios";

const MyAppointmentCart = () => {
  const { appointmentCart, removeFromAppointmentCart, token } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.id;

  const handleBookAppointment = async (doctor) => {
    try {
      console.log("Printing the doctor in handleBookAppointment", doctor);
      setLoading(true);
      const response = await bookAppointmentAPI(doctor, userId);
      setLoading(false);
      if (response.success) {
        removeFromAppointmentCart(doctor.doctorId);
        window.location.href = response.paymentUrl;
      } else {
        alert(response.message || "Failed to place order");
      }
    } catch (err) {
      console.log("error in handleBookAppointment", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appointment Cart</h2>

      {appointmentCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {appointmentCart.map((doctor, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div className="flex gap-3">
                <div>
                  <img
                    src={doctor.profileImage}
                    alt={doctor.docName}
                    className="w-[100px] h-[100px] rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{doctor.docName}</h3>
                  <p>Specialization: {doctor.specialization}</p>
                  <p>Fee: ₹{doctor.fees}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Book Now
                </button>
                <button
                  onClick={() => removeFromAppointmentCart(doctor.doctorId)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointmentCart;
