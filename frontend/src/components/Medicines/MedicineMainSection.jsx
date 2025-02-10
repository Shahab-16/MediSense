import React from "react";
import { FaShieldAlt, FaClock, FaTruck, FaCheck } from "react-icons/fa";

const MedicineMainSection = () => {
  return (
    <div className="container mx-auto max-w-[1400px] px-4 md:px-6 lg:px-4 mt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] shadow-xl p-4 lg:p-6 xl:p-8 gap-6 lg:gap-8">
        {/* Left Content */}
        <div className="flex flex-col gap-4 lg:w-[52%] xl:w-[48%] 2xl:w-[45%]">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            Your Trusted
            <span className="text-blue-700"> Online Pharmacy</span>
            <span className="block text-gray-700 mt-1">Delivered to Your Doorstep</span>
          </h1>
          
          <div className="space-y-3 pr-0 xl:pr-2">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="p-2 bg-blue-100 rounded-md shrink-0">
                <FaShieldAlt className="text-blue-700 text-lg" />
              </div>
              <span className="text-gray-800 text-base lg:text-lg font-semibold">Certified Medicines & Quality Assurance</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="p-2 bg-green-100 rounded-md shrink-0">
                <FaClock className="text-green-700 text-lg" />
              </div>
              <span className="text-gray-800 text-base lg:text-lg font-semibold">24/7 Expert Support</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="p-2 bg-purple-100 rounded-md shrink-0">
                <FaTruck className="text-purple-700 text-lg" />
              </div>
              <span className="text-gray-800 text-base lg:text-lg font-semibold">Secure & Discreet Delivery</span>
            </div>
          </div>

          <button className="bg-blue-700 text-white text-base lg:text-lg font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-blue-800 hover:shadow-lg w-fit focus:ring-4 focus:ring-blue-200 mt-1">
            Order Now
            <span className="ml-2 transition-all duration-300">→</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="relative lg:w-[50%] xl:w-[54%] 2xl:w-[57%] h-[420px] xl:h-[470px] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
          <img 
            src="https://uparcel.s3-us-west-2.amazonaws.com/uploads/banner_img/MedicineDelivery.png"
            alt="Professional Pharmacy Service"
            className="w-full h-full object-fit"
          />
          
          {/* Image Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/20" />
          
          <div className="absolute bottom-4 left-3 right-3 bg-white/90 p-3 rounded-lg shadow-md mx-3">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-600 text-lg shrink-0" />
              <p className="text-xs lg:text-sm font-semibold text-gray-800 leading-tight">
                Verified Professionals | Temperature Control | Real-Time Tracking
              </p>
            </div>
          </div>
          
          <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs lg:text-sm font-semibold text-gray-800">Live Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineMainSection;