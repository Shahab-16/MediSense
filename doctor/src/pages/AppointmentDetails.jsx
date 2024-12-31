import React from 'react';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id: appointmentId } = useParams();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-600">Appointment Details</h2>

      <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Appointment Information</h3>
        <div className="mt-4">
          <p className="text-lg">
            <span className="font-bold">Appointment ID:</span> {appointmentId}
          </p>
          <p className="text-lg">
            <span className="font-bold">Doctor:</span> Dr. John Doe
          </p>
          <p className="text-lg">
            <span className="font-bold">Patient:</span> Alice Johnson
          </p>
          <p className="text-lg">
            <span className="font-bold">Condition:</span> Fever
          </p>
          <p className="text-lg">
            <span className="font-bold">Time:</span> 10:00 AM
          </p>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Additional Notes</h3>
        <p className="mt-4 text-gray-700">
          Ensure the patient completes the prescribed tests before the next visit.
        </p>
      </div>
    </div>
  );
};

export default AppointmentDetails;
