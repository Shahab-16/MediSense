


import React from "react";
import {
  FaCapsules,
  FaHeartbeat,
  FaPills,
  FaTablets,
  FaPrescriptionBottleAlt,
  FaBrain,
  FaRegEye,
  FaVirus,
} from "react-icons/fa";
import { GiLungs, GiLiver } from "react-icons/gi";
import { BiHappyHeartEyes } from "react-icons/bi";
import { RiMentalHealthLine } from "react-icons/ri";
import { MdSick } from "react-icons/md";

const MedicineCategory = ({ category, setCategory }) => {
  const medicine_categories = [
    { name: "Diabetes", icon: <FaCapsules /> },
    { name: "Hypertension", icon: <FaHeartbeat /> },
    { name: "Cold", icon: <MdSick /> },
    { name: "Heart Disease", icon: <FaHeartbeat /> },
    { name: "Allergies", icon: <FaPills /> },
    { name: "Asthma", icon: <GiLungs /> },
    { name: "Arthritis", icon: <FaTablets /> },
    { name: "Skin Conditions", icon: <BiHappyHeartEyes /> },
    { name: "Infections", icon: <FaVirus /> },
    { name: "Gastrointestinal Issues", icon: <FaPrescriptionBottleAlt /> },
    { name: "Thyroid Disorders", icon: <FaCapsules /> },
    { name: "Mental Health", icon: <RiMentalHealthLine /> },
    { name: "Pain Management", icon: <FaTablets /> },
    { name: "Fever", icon: <MdSick /> },
    { name: "Vitamin Deficiencies", icon: <FaPills /> },
    { name: "Kidney Disorders", icon: <FaHeartbeat /> },
    { name: "Liver Disorders", icon: <GiLiver /> },
    { name: "Neurological Disorders", icon: <FaBrain /> },
    { name: "Cancer", icon: <FaPills /> },
    { name: "Eye Care", icon: <FaRegEye /> },
  ];

  return (
    <div className="flex flex-col gap-7 mx-auto max-w-[1300px] mt-4">
      <h2 className="font-bold mb-2 text-4xl text-black text-center">
        Explore Medicines by Category
      </h2>
      <div className="flex gap-8 overflow-x-auto p-4 text-center scrollbar-hide">
        {medicine_categories.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) => (prev === item.name ? "All" : item.name))
            }
            className={`flex flex-col items-center gap-3 min-w-[120px] p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              category === item.name
                ? "border-2 border-blue-600 bg-blue-100"
                : "border border-gray-300 bg-white"
            }`}
          >
            <div className="text-[50px] text-blue-600">{item.icon}</div>
            <p className="text-gray-700 font-medium">{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="w-full h-[2px] mt-2 bg-gray-300"></hr>
    </div>
  );
};

export default MedicineCategory;
