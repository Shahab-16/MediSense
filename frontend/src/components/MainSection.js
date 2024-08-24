import React from 'react'
import { feature_list, images} from '../assets/asset'
import { FaArrowRightLong } from "react-icons/fa6";

const HeroSection = () => {
    return (
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-20 py-10 gap-6">
        
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center lg:items:start">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Welcome to MediSense
          </h2>
          <p className="text-lg lg:text-2xl text-gray-700 mb-8 max-w-[80%]">
            Your One-Step Solution For Disease Prediction, Medicine Shop, And Doctor Services.
          </p>
          
          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%]">
            {feature_list.map((item, index) => (
              <div
                key={index}
                className="flex items-start bg-slate-100 p-2 rounded-lg shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-[10px]">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-blue-800 text-white text-lg font-semibold py-3 px-6 mt-3 rounded-lg flex items-center hover:bg-blue-600">
            Contact Us
            <FaArrowRightLong className="ml-2" />
          </button>
        </div>
        
        {/* Right Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-end">
          <img
            src={images.doctor1}
            alt="Doctor"
            className="w-full  max-w-md lg:max-w-[80%]"
          />
        </div>
      </div>
    );
  };

export default HeroSection
