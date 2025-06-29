import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const MedicinesList = ({ _id, medicineImage, name, category, price, description }) => {
 
  const {addToMedicineCart,removeFromMedicineCart,medicineCart,token}=useContext(StoreContext)


  let userId = null;
try {
  const payload = JSON.parse(atob(token.split('.')[1]));
  userId = payload.id;
  console.log("Printing the userId in medicinesList", userId);
} catch (err) {
  console.error("Invalid token or decoding error:", err);
}


  console.log("Printing the userId in medicinesList",userId);

  useEffect(() => {
    return () => console.log("Cleanup before next effect or unmount");
  }, [medicineCart]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="h-48 w-full bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
        <img src={medicineImage} alt={name} className="h-48 w-full object-fit" />
      </div>

      {/* Details Section */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-gray-800 mt-2 text-[15px] min-h-[50px]">{description}</p>
        <p className="text-xl font-semibold text-blue-600 mt-4">₹{price}</p>

        {/* Cart Buttons */}
        {!medicineCart[_id] ? (
          <button
            onClick={()=> addToMedicineCart(_id,userId)}
            className="mt-4 w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-700 text-white transition-all duration-300 hover:bg-blue-800 hover:shadow-md"
          >
            <FaCartPlus className="text-lg" />
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded shadow-inner">
            <button
              onClick={()=> removeFromMedicineCart(_id,userId)}
              className="text-red-600 text-2xl hover:text-red-700 transition-all"
            >
              {medicineCart[_id] === 1 ? <FaTrash /> : <FaMinusCircle />}
            </button>
            <span className="text-lg font-semibold text-gray-800">{medicineCart[_id]}</span>
            <button
              onClick={() => addToMedicineCart(_id, userId)}
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
