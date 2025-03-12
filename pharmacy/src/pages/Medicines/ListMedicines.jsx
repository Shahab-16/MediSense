import React from "react";
import { medicines } from "../../assets/admin_assets/assets";
import { AiOutlineDelete } from "react-icons/ai";
import { listAllMedicine,removeMedicine } from "../../services/api";

const ListMedicines = () => {
  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-6 text-lg font-semibold border-b pb-4">
        <p className="text-center">Image</p>
        <p className="text-left">Medicine Name</p>
        <p className="text-left">Category</p>
        <p className="text-right">Price</p>
        <p className="text-left">Composition</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-6">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center text-sm sm:text-base bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="text-center">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-md object-cover mx-auto"
              />
            </div>

            {/* Medicine Name */}
            <p className="text-left font-medium text-gray-800">{medicine.name}</p>

            {/* Category */}
            <p className="hidden sm:block text-left text-gray-600">
              {medicine.category}
            </p>

            {/* Price */}
            <p className="text-right font-semibold text-gray-800">
              ₹{medicine.price}
            </p>

            {/* Composition */}
            <p className="hidden sm:block text-left text-gray-600">
              {medicine.composition}
            </p>

            {/* Remove Button */}
            <div className="text-center">
              <button
                className="text-red-600 hover:text-red-800 transition-colors duration-300"
                onClick={()=>deleteHandler(medicine.id,number)}
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMedicines;
