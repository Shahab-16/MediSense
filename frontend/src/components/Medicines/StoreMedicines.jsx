import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const StoreMedicinesList = () => {
  const { storeId } = useParams();

  const medicines = [
    { id: 1, name: "Medicine 1", price: 750, image: "path-to-image1.jpg", category: "Painkiller", description: "Helps to relieve pain." },
    { id: 2, name: "Medicine 2", price: 900, image: "path-to-image2.jpg", category: "Antibiotic", description: "Fights bacterial infections." },
    { id: 3, name: "Medicine 3", price: 1100, image: "path-to-image3.jpg", category: "Vitamins", description: "Boosts immune system." },
    { id: 4, name: "Medicine 4", price: 1500, image: "path-to-image4.jpg", category: "Cold & Flu", description: "Relieves cold symptoms." },
    { id: 5, name: "Medicine 5", price: 1350, image: "path-to-image5.jpg", category: "Cough Syrup", description: "Soothes throat and reduces cough." },
  ];

  const [cart, setCart] = useState({});

  const handleAddToCart = (id) => {
    setCart((prevCart) => ({ ...prevCart, [id]: 1 }));
  };

  const handleIncrement = (id) => {
    setCart((prevCart) => ({ ...prevCart, [id]: prevCart[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      if (prevCart[id] === 1) {
        const newCart = { ...prevCart };
        delete newCart[id];
        return newCart;
      }
      return { ...prevCart, [id]: prevCart[id] - 1 };
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-[1380px]">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Medicines Available in Store {storeId}
      </h2>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white shadow-md rounded-lg w-72 h-[400px] mx-auto">
            {/* Image Section */}
            <div className="h-40 w-full bg-gray-200 flex items-center justify-center rounded-t-lg overflow-hidden">
              <img src={medicine.image} alt={medicine.name} className="h-full w-full object-cover" />
            </div>

            {/* Details Section */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{medicine.name}</h2>
              <p className="text-sm text-gray-500">{medicine.category}</p>
              <p className="text-gray-800 mt-1 text-[14px] min-h-[50px]">{medicine.description}</p>
              <p className="text-xl font-semibold text-blue-600 mt-3">₹{medicine.price}</p>

              {/* Cart Buttons */}
              {cart[medicine.id] === undefined ? (
                <button
                  onClick={() => handleAddToCart(medicine.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded bg-blue-700 text-white transition-all duration-300"
                >
                  <FaCartPlus className="text-lg" />
                  Add to Cart
                </button>
              ) : (
                <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded">
                  <button
                    onClick={() => handleDecrement(medicine.id)}
                    className="text-red-600 text-2xl"
                  >
                    {cart[medicine.id] === 1 ? <FaTrash /> : <FaMinusCircle />}
                  </button>
                  <span className="text-lg font-semibold text-gray-800">{cart[medicine.id]}</span>
                  <button
                    onClick={() => handleIncrement(medicine.id)}
                    className="text-green-600 text-2xl"
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreMedicinesList;
