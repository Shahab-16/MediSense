import React from "react";
import { doctor_features } from "../assets/asset";
const DoctorCard = ({ name, specialization, address, stats, image }) => {
  return (
    <div className="bg-white shadow-xl shadow-gray-300 p-4 rounded-lg h-[100%] overflow-hidden">
      <div className="mb-3">
        <img
          className="w-[100%] h-full object-cover rounded-lg"
          src={image}
          alt={`${name}'s image`}
        />
      </div>
      <div className="mb-3">
        <h1 className="font-semibold text-lg">{name}</h1>
        <h2 className="font-normal italic text-gray-600 text-sm">
          {specialization}
        </h2>
      </div>
      <div>
        <h2 className="text-md text-gray-800">+1400 patients {stats}</h2>
        <h3 className="text-gray-600 text-sm">Address: {address}</h3>
      </div>
    </div>
  );
};

const DoctorSection = () => {
  return (
    <div>
      <div className="flex items-center justify-center lg:max-w-[1400px] text-3xl font-bold">
        Our High Qualified Doctors
      </div>
      <div className="  grid grid-cols-4 gap-2 p-9">
        {doctor_features.map((feature, index) => (
          <DoctorCard
            name={feature.name}
            specialization={feature.specialization}
            address={feature.address}
            stats={feature.stats}
            image={feature.img}
          ></DoctorCard>
        ))}
      </div>
    </div>
  );
};

export default DoctorSection;
