import React from "react";
import { medicine_categories } from "../../assets/asset";

const MedicineCategory = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-7 mx-auto max-w-[1300px] mt-4">
      <h2 className="font-bold mb-2 text-4xl text-blue-700">
        Explore Medicines by Disease
      </h2>
      <div className="flex gap-8 overflow-x-auto scrollbar-hide p-1 text-center">
        {medicine_categories.map((item) => (
          <div
            key={item.name}
            onClick={() => 
            setCategory((prev)=>
            prev===item.name ? "All" : item.name
            )}
            className={`${
              category === item.name
                ? "bg-blue-700 text-white"
                : "text-black bg-gray-300"
            } px-4 flex justify-center items-center rounded-lg cursor-pointer shadow-md hover:bg-blue-500 hover:text-white`}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="w-full h-[1.5px] mt-2 bg-black"></hr>
    </div>
  );
};

export default MedicineCategory;
