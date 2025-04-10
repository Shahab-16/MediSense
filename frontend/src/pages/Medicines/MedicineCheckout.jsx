import React from "react";
import { FaPills, FaShoppingCart, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {images} from "../../assets/asset"; // Replace with your image path

const MedicineCheckout = () => {


 const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-min-screen flex flex-col items-center bg-gray-100 mt-8 m-4 pb-8 rounded-lg">
      <h1 className="text-4xl font-bold text-blue-700 mt-6 mb-4">Welcome to Medicine Checkout</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-[80%] max-w-[800px]">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <img
            src={images.medicineShop}
            alt="Medicine"
            className="w-[150px] h-[150px] rounded-md object-cover"
          />
          <p className="text-lg text-gray-700 text-center md:text-left">
            Easily order your medicines online. Fill in the required details and proceed to secure payment to receive your medicines at your doorstep.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaPills className="text-blue-600" />
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                className="flex-1 outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaPills className="text-blue-600" />
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
            <MdEmail className="text-blue-600" />
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <input
                required
                type="text"
                name="city"
                placeholder="City"
                className="flex-1 outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <input
                required
                type="text"
                name="state"
                placeholder="State"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <input
                required
                type="number"
                name="pinCode"
                placeholder="Pin Code"
                className="flex-1 outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <input
                required
                type="text"
                name="country"
                placeholder="Country"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
            <FaPhoneAlt className="text-blue-600" />
            <input
              required
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              className="flex-1 outline-none"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-between text-lg">
              <p>Subtotal</p>
              <p>₹120</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Delivery Fee</p>
              <p>₹5</p>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>₹125</p>
            </div>
          </div>

          <button
            type="submit"
            onClick={submitHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold w-full py-3 rounded-lg mt-4 transition"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default MedicineCheckout;
