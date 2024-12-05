import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/asset";

const LoginOptions = () => {
  const navigate = useNavigate();

  const handleOptionClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="w-[900px] h-[550px] rounded-lg bg-white shadow-2xl border border-gray-300 flex overflow-hidden relative">
        {/* Left Image Section */}
        <div className="w-2/3 hidden lg:block">
          <img src={images.role_img} alt="Choose Role" className="w-full h-full object-fit" />
        </div>

        {/* Right Content Section */}
        <div className="bg-white w-full lg:w-1/3 p-10 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Choose Your Role</h2>
          
          <button
            onClick={() => handleOptionClick("user")}
            className="w-full py-3 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300 hover:from-blue-700 hover:to-indigo-700 text-lg font-semibold"
          >
            User
          </button>
          
          <button
            onClick={() => handleOptionClick("admin")}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300 hover:from-green-600 hover:to-teal-600 text-lg font-semibold"
          >
            Admin
          </button>
          
          <p className="mt-8 text-gray-600 text-sm">
            Not sure? <span className="text-blue-600 cursor-pointer hover:underline">Learn more</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
