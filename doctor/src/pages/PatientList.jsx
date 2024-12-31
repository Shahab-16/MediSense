import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const patients = [
    { id: 1, name: 'Alice Johnson', condition: 'Fever', profilePic: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Bob Smith', condition: 'Cough', profilePic: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Charlie Brown', condition: 'Headache', profilePic: 'https://via.placeholder.com/50' },
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Returns the current date and time
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">PATIENTS</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Condition</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id} className="border-t hover:bg-gray-50 my-2 transition duration-200 shadow-lg rounded-lg">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img
                    src={patient.profilePic}
                    alt={`${patient.name}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-lg text-gray-600">{patient.condition}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{getCurrentDateTime()}</td>
                <td className="px-6 py-4 text-lg text-blue-500">
                  <Link to={`/appointments/${patient.id}`} className="hover:underline">View Appointment</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
