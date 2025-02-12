import React from 'react';
import { FaPills } from 'react-icons/fa';

const OrderedMedicines = () => {
  const medicines = [
    { id: 1, name: 'Paracetamol', date: '2023-10-01', status: 'Pending' },
    { id: 2, name: 'Ibuprofen', date: '2023-10-05', status: 'Shipped' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaPills className="mr-2" /> Ordered Medicines
      </h2>
      <div className="space-y-4">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{medicine.name}</p>
            <p className="text-sm text-gray-600">Order Date: {medicine.date}</p>
            <p className="text-sm text-gray-600">Status: {medicine.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderedMedicines;