import React from "react";
import { images } from "../../assets/asset";
const MedicineMainSection = () => {
  return (
    <div className="flex justify-between items-center mx-auto max-w-[1300px] bg-slate-200 rounded-lg shadow-lg mt-12 p-6">
      <div className="flex flex-col gap-6 p-4">
        <h1 className="text-4xl max-w-[380px] text-black font-bold tracking-wider">SHOP MEDICINES WITH CONFIDENCE</h1>
        <p className="text-gray-600 text-lg p-1">
          Health Delivered, Anywhere, Anytime.
          <br />
          Quality Medicines You Can Trust.
          <br />
          Your Wellness is Just a Click Away.
        </p>
        <button className="bg-blue-700 text-center text-white text-lg font-semibold max-w-[150px] py-3 px-6 mt-3 rounded-lg flex items-center hover:bg-blue-600">
          Shop Now
        </button>
      </div>
      <div className="w-1/2 h-[500px] overflow-hidden shadow-md rounded-lg">
        <img src={images.medicineShop} alt="medicineShop" className="w-full h-full" />
      </div>
    </div>
  );
};

export default MedicineMainSection;
