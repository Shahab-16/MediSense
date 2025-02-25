import React, { useState } from "react";
import { MdLocalPharmacy } from "react-icons/md";

const MedicineList = () => {
  // Dummy data for medicines
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", price: "₹50", category: "Analgesic", composition: "Paracetamol 500mg", status: "Pending" },
    { id: 2, name: "Amoxicillin", price: "₹120", category: "Antibiotic", composition: "Amoxicillin 250mg", status: "In Transit" },
    { id: 3, name: "Cetirizine", price: "₹30", category: "Antihistamine", composition: "Cetirizine 10mg", status: "Delivered" },
    { id: 4, name: "Ibuprofen", price: "₹75", category: "NSAID", composition: "Ibuprofen 400mg", status: "Pending" },
    { id: 5, name: "Azithromycin", price: "₹150", category: "Antibiotic", composition: "Azithromycin 500mg", status: "In Transit" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.id === id ? { ...medicine, status: newStatus } : medicine
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <p className="mb-3 text-lg font-medium">Medicine List</p>
      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_3fr_2fr] grid-flow-col py-3 px-6 border-b bg-gray-100 font-semibold">
          <p>#</p>
          <p>Medicine Name</p>
          <p>Price</p>
          <p>Category</p>
          <p>Composition</p>
          <p>Delivery Status</p>
        </div>

        {/* Medicines */}
        <div className="flex flex-col">
          {medicines.map((medicine, index) => (
            <div
              key={medicine.id}
              className="grid grid-cols-[0.5fr_3fr_1fr_2fr_3fr_2fr] grid-flow-col py-3 px-6 border-b items-center hover:bg-gray-50 transition duration-300"
            >
              {/* Index */}
              <p>{index + 1}</p>

              {/* Medicine Name */}
              <p className="flex items-center gap-2">
                <MdLocalPharmacy className="text-blue-500" size={18} />
                {medicine.name}
              </p>

              {/* Price */}
              <p className="text-green-600 font-medium">{medicine.price}</p>

              {/* Category */}
              <p>{medicine.category}</p>

              {/* Composition */}
              <p>{medicine.composition}</p>

              {/* Delivery Status */}
              <select
                value={medicine.status}
                onChange={(e) => handleStatusChange(medicine.id, e.target.value)}
                className="border rounded-md px-2 py-1 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
