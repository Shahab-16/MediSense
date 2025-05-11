import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/asset";

const LoginOptions = () => {
  const navigate = useNavigate();
  const handleOptionClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100">
      <div className="w-[900px] h-[550px] rounded-2xl bg-white shadow-2xl border border-gray-300 flex overflow-hidden relative">
        {/* Left Image Section */}
        <div className="w-2/3 hidden lg:block">
          <img src={images.role_img} alt="Choose Role" className="w-full h-full object-fit" />
        </div>

        {/* Right Content Section */}
        <div className="bg-white w-full lg:w-1/3 p-8 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Choose Your Role</h2>
          
          <button
            onClick={() => handleOptionClick("user")}
            className="w-full py-3 mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 hover:from-blue-600 hover:to-indigo-600 text-lg font-semibold"
          >
            User
          </button>
          
          <button
            onClick={() => handleOptionClick("admin")}
            className="w-full py-3 mb-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 hover:from-green-600 hover:to-teal-600 text-lg font-semibold"
          >
            Admin
          </button>

          <button
            onClick={() => handleOptionClick("doctor")}
            className="w-full py-3 mb-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 hover:from-purple-600 hover:to-purple-800 text-lg font-semibold"
          >
            Doctor
          </button>

          <button
            onClick={() => handleOptionClick("hospital")}
            className="w-full py-3 mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 hover:from-red-600 hover:to-pink-600 text-lg font-semibold"
          >
            Hospital
          </button>

          <button
            onClick={() => handleOptionClick("pharmacy")}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 hover:from-orange-600 hover:to-yellow-600 text-lg font-semibold"
          >
            Medicine Stores
          </button>
          
          <p className="mt-6 text-gray-600 text-sm">
            Not sure? <span className="text-blue-600 cursor-pointer hover:underline">Learn more</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
