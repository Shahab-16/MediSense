import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const MyAppointments = () => {
  const appointments = [
    { id: 1, doctor: 'Dr. Smith', date: '2023-10-10', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Johnson', date: '2023-10-15', time: '02:00 PM' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaCalendarAlt className="mr-2" /> My Appointments
      </h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{appointment.doctor}</p>
            <p className="text-sm text-gray-600">Date: {appointment.date}</p>
            <p className="text-sm text-gray-600">Time: {appointment.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;