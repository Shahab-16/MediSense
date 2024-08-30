import React from "react";
import { images } from "../assets/asset";

const ModelSection = () => {
  return (
    <div className="flex flex-col mx-auto lg:max-w-[1400px] lg:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
      {/* Left Side: Image */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-8">
        <img
          src={images.modelSectionImage}
          alt="AI in Medicine"
          className="rounded-lg shadow-lg w-full h-full object-cover"
        />
      </div>
      {/* Right Side: Title and Description */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Revolutionizing Healthcare: The Future of Medicine with Intelligent Technology
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning
          (DL) are revolutionizing the medical field by offering innovative
          solutions to complex challenges. These technologies are making
          healthcare more accurate, accessible, and efficient.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Enhancing diagnostic accuracy through image analysis.</li>
          <li>Personalizing treatment plans with predictive analytics.</li>
          <li>Accelerating drug discovery and development.</li>
          <li>Improving patient outcomes with real-time monitoring.</li>
          <li>Reducing healthcare costs through automation.</li>
        </ul>
        <button className="bg-blue-800 font-semibold text-white lg:w-[30%] px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-600">
          Learn More
        </button>
      </div>
    </div>
  );
};


export default ModelSection;
