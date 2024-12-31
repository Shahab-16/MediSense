import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const patients = [
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Smith', condition: 'Cough' },
    { id: 3, name: 'Charlie Brown', condition: 'Headache' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Patients</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Condition</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="border-t">
              <td className="px-6 py-3">{patient.name}</td>
              <td className="px-6 py-3">{patient.condition}</td>
              <td className="px-6 py-3">
                <Link to={`/appointments/${patient.id}`} className="text-blue-500">View Appointment</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
