import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const DeliveredMedicines = () => {
  const medicines = [
    { id: 1, name: 'Amoxicillin', date: '2023-09-25', status: 'Delivered' },
    { id: 2, name: 'Cetirizine', date: '2023-09-28', status: 'Delivered' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaCheckCircle className="mr-2" /> Delivered Medicines
      </h2>
      <div className="space-y-4">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{medicine.name}</p>
            <p className="text-sm text-gray-600">Delivery Date: {medicine.date}</p>
            <p className="text-sm text-gray-600">Status: {medicine.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveredMedicines;