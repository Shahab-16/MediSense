import React, { useState } from 'react';
import { FaCartPlus, FaTrashAlt } from 'react-icons/fa';

const MedicinesList = ({ image, name, category, price, description }) => {
  const [inCart, setInCart] = useState(false);

  const handleCartToggle = () => {
    setInCart(!inCart);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-xs mx-auto">
      {/* Image Section */}
      <div className="h-48 w-full bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="h-full object-contain" 
        />
      </div>

      {/* Details Section */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-gray-800 mt-2 text-[15px] min-h-[50px]">{description}</p>
        <p className="text-xl font-semibold text-blue-600 mt-4">₹{price}</p>

        {/* Cart Buttons */}
        <button
          onClick={handleCartToggle}
          className={`mt-4 w-full flex items-center justify-center gap-2 p-2 rounded ${
            inCart ? 'bg-red-600 text-white' : 'bg-blue-700 text-white'
          } transition-all duration-300 hover:shadow-md`}
        >
          {inCart ? <FaTrashAlt /> : <FaCartPlus />}
          {inCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default MedicinesList;
