import React, { useState, useContext, useEffect } from "react";
import { FaPills, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { images } from "../../assets/asset";
import { placeMedicineOrder, getAllMedicinesInCart } from "../../services/axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const MedicineCheckout = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  // Extract user ID from token
  const payload = JSON.parse(atob(token.split('.')[1]));
  const patientId = payload.id;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    streetAddress: '',
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  });

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await getAllMedicinesInCart({ userId: patientId });
        
        if (Array.isArray(response)) {
          setCartItems(response);
          
          const subtotal = response.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
          }, 0);
          
          const deliveryFee = 20;
          setTotalAmount(subtotal + deliveryFee);
        } else {
          console.error("Invalid cart data format:", response);
          alert("Failed to load cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        alert("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.streetAddress || !formData.email || 
          !formData.phoneNumber || !formData.city || !formData.state || 
          !formData.pinCode || !formData.country) {
        alert("Please fill all required fields");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // Prepare delivery address with new structure
      const deliveryAddress = {
        name: formData.name,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.pinCode,
        country: formData.country,
        phone: formData.phoneNumber,
        email: formData.email
      };

      // Prepare items array
      const items = cartItems.map(item => ({
        medicineId: item._id,
        quantity: item.quantity || 1
      }));

      // Call the place order API
      const response = await placeMedicineOrder({
        patientId,
        items,
        deliveryAddress
      });

      if (response.success) {
        window.location.href = response.paymentUrl;
      } else {
        alert(response.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing your order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-min-screen flex flex-col items-center bg-gray-100 mt-8 m-4 pb-8 rounded-lg">
      <h1 className="text-4xl font-bold text-blue-700 mt-6 mb-4">Medicine Checkout</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-[80%] max-w-[800px]">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <img
            src={images.medicineShop}
            alt="Medicine"
            className="w-[150px] h-[150px] rounded-md object-cover"
          />
          <p className="text-lg text-gray-700 text-center md:text-left">
            Please review your order and fill in the delivery details.
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Your Order</h2>
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between py-2 border-b">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-b">
            <span>Delivery Fee</span>
            <span>₹20.00</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Details Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaPills className="text-blue-600" />
              <input
                required
                type="text"
                name="name"
                className="flex-1 outline-none"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <input
                required
                type="text"
                name="streetAddress"
                className="flex-1 outline-none"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="123 Main St, Apt 4B"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <input
                  required
                  type="text"
                  name="city"
                  className="flex-1 outline-none"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <input
                  required
                  type="text"
                  name="state"
                  className="flex-1 outline-none"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <input
                  required
                  type="number"
                  name="pinCode"
                  className="flex-1 outline-none"
                  value={formData.pinCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <input
                  required
                  type="text"
                  name="country"
                  className="flex-1 outline-none"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <MdEmail className="text-blue-600" />
              <input
                required
                type="email"
                name="email"
                className="flex-1 outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaPhoneAlt className="text-blue-600" />
              <input
                required
                type="number"
                name="phoneNumber"
                className="flex-1 outline-none"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold w-full py-3 rounded-lg mt-4 transition disabled:bg-blue-400 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              cartItems.length === 0 ? "Your cart is empty" : "Proceed to Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MedicineCheckout;