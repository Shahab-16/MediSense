import { medicines_for_cart } from "../../assets/asset";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const cartItems = {
  1: 2, // Paracetamol
  2: 1, // Aspirin
  3: 1, // Ibuprofen
  4: 1, // Dextromethorphan
  5: 3, // Aspirin
};

const totalCartAmount = () => {
  return medicines_for_cart.reduce((total, medicine) => {
    const quantity = cartItems[medicine._id] || 0;
    return total + medicine.price * quantity;
  }, 0);
};

const removeFromCart = (id) => {
  delete cartItems[id];
  console.log("Item removed:", id);
};


const MedicinesCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
    {/* Header */}
    <div className="grid grid-cols-6 gap-10 text-lg font-semibold border-b pb-2">
      <p className="text-center">Item</p>
      <p className="text-left">Title</p>
      <p className="text-right">Price</p>
      <p className="text-right">Quantity</p>
      <p className="text-right">Total</p>
      <p className="text-center">Remove</p>
    </div>
  
    {/* Items */}
    <div className="flex flex-col gap-10">
      {medicines_for_cart.map((medicine) => {
        if (cartItems[medicine._id]) {
          return (
            <div key={medicine._id} className="grid grid-cols-6 gap-10 items-center text-sm sm:text-base">
              <img
                src={medicine.image}
                alt="medicine_item"
                className="w-[50px] h-[50px] rounded-md mx-auto"
              />
              <p className="text-left">{medicine.name}</p>
              <p className="text-right">₹{medicine.price}</p>
              <p className="text-right">{cartItems[medicine._id]}</p>
              <p className="text-right">₹{cartItems[medicine._id] * medicine.price}</p>
              <div className="text-center">
                <button
                  onClick={() => removeFromCart(medicine._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  
    {/* Cart Totals and Promo Code */}
    <div className="flex flex-col lg:flex-row justify-between gap-6 mt-[3rem]">
      {/* Cart Totals */}
      <div className="flex flex-col gap-4 w-full lg:w-[500px] p-4 border rounded-md shadow-md">
        <p className="text-2xl font-semibold text-gray-700">Cart Totals</p>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹{totalCartAmount()}</p>
        </div>
        <div className="h-[1px] w-full bg-gray-300 mx-auto"></div>
  
        <div className="flex justify-between mt-2">
          <p>Delivery Fee</p>
          <p>₹{totalCartAmount() > 0 ? 2 : 0}</p>
        </div>
        <div className="h-[1px] w-full bg-gray-300 mx-auto"></div>
  
        <div className="flex justify-between mt-2 font-semibold">
          <p>Total</p>
          <p>₹{totalCartAmount() > 0 ? totalCartAmount() + 2 : 0}</p>
        </div>
  
        <button
          onClick={() => navigate("/dashboard/medicines/checkout")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-[50px] text-center rounded-lg mt-4"
        >
          Proceed to Checkout
        </button>
      </div>
  
      {/* Promo Code */}
      <div className="flex flex-col w-full h-[8rem] lg:w-[400px] gap-4 p-4 border rounded-md shadow-md">
        <p className="text-lg font-medium text-gray-700">
          If you have a promo code, enter it here:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="bg-gray-200 border-none h-[40px] w-full rounded-md px-4 placeholder-black placeholder-opacity-60"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default MedicinesCart;
