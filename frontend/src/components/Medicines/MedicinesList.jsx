import React, { useState } from 'react';
import { FaCartPlus, FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const MedicinesList = ({ image, name, category, price, description }) => {
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    setCount(1); // Start with 1 when adding
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 max-w-xs mx-auto transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="h-48 w-full bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="h-full object-contain" />
      </div>

      {/* Details Section */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-gray-800 mt-2 text-[15px] min-h-[50px]">{description}</p>
        <p className="text-xl font-semibold text-blue-600 mt-4">₹{price}</p>

        {/* Cart Buttons */}
        {count === 0 ? (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-700 text-white transition-all duration-300 hover:bg-blue-800 hover:shadow-md"
          >
            <FaCartPlus className="text-lg" />
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded shadow-inner">
            <button
              onClick={handleDecrement}
              className="text-red-600 text-2xl hover:text-red-700 transition-all"
            >
              {count === 1 ? <FaTrash /> : <FaMinusCircle />}
            </button>
            <span className="text-lg font-semibold text-gray-800">{count}</span>
            <button
              onClick={handleIncrement}
              className="text-green-600 text-2xl hover:text-green-700 transition-all"
            >
              <FaPlusCircle />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicinesList;
