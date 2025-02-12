import React from 'react';
import { FaUserMd } from 'react-icons/fa';

const ConsultedDoctors = () => {
  const doctors = [
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiologist', date: '2023-09-20' },
    { id: 2, name: 'Dr. Johnson', specialization: 'Dermatologist', date: '2023-09-25' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaUserMd className="mr-2" /> Consulted Doctors
      </h2>
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{doctor.name}</p>
            <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
            <p className="text-sm text-gray-600">Consultation Date: {doctor.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultedDoctors;