import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getAllMedicinesInCart} from "../../services/axios";
import { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const MedicinesCart = () => {
  const [cartMedicines, setCartMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, removeFromMedicineCart, medicineCart } = useContext(StoreContext);

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.id;

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getAllMedicinesInCart({ userId });
      console.log("Printing medicines in cart",response);
      setCartMedicines(response);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [medicineCart]);

  const handleRemove = async (medicineId) => {
    try {
      console.log("Printing the medicineId and userId in handleRemove",medicineId," ",userId);
      await removeFromMedicineCart(medicineId, userId);
      fetchCartItems(); // Refresh cart
    } catch (err) {
      console.error("Error removing from cart", err);
    }
  };

  const totalCartAmount = cartMedicines.reduce((total, medicine) => {
    return total + (medicine.price * medicine.quantity);
  }, 0);

  const deliveryFee = 20;
  const grandTotal = totalCartAmount > 0 ? totalCartAmount + deliveryFee : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cartMedicines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any medicines yet</p>
          <button 
            onClick={() => navigate("/dashboard/medicines")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Browse Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Medicine Cart</h1>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b font-medium text-gray-700">
          <div className="col-span-5 md:col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Subtotal</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {/* Cart Items */}
        {cartMedicines.map((medicine) => (
          <div key={medicine._id} className="grid grid-cols-12 gap-4 p-4 border-b items-center hover:bg-gray-50 transition">
            <div className="col-span-5 md:col-span-6 flex items-center">
              <img 
                src={medicine.medicineImage || "/default-medicine.jpg"} 
                alt={medicine.name} 
                className="w-16 h-16 rounded-md object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-800">{medicine.name}</h3>
                <p className="text-sm text-gray-500">{medicine.strength}</p>
              </div>
            </div>
            <div className="col-span-2 text-center text-gray-700">₹{medicine.price.toFixed(2)}</div>
            <div className="col-span-2 text-center text-gray-700">
              <span className="inline-block w-10 text-center border rounded py-1">
                {medicine.quantity}
              </span>
            </div>
            <div className="col-span-2 text-center font-medium text-gray-800">
              ₹{(medicine.price * medicine.quantity).toFixed(2)}
            </div>
            <div className="col-span-1 text-center">
              <button
                onClick={() => handleRemove(medicine._id)}
                className="text-red-500 hover:text-red-700 transition"
                aria-label="Remove item"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <button 
            onClick={() => navigate("/dashboard/medicines")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div className="md:w-1/3 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{totalCartAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">₹{totalCartAmount > 0 ? deliveryFee.toFixed(2) : '0.00'}</span>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-blue-600">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/medicines/checkout")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-6 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicinesCart;