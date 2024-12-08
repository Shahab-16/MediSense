import React from 'react'
import { images } from '../../assets/asset'
import { doctor_features } from '../../assets/asset';
const DoctorCard2 = ({ name, specialization, image }) => {
    return (
      <div className="bg-white shadow-xl shadow-gray-300 rounded-lg h-fit w-fit overflow-hidden p-4">
        <div className="mb-3">
          <img
            className="w-[250px] h-[200px] rounded-lg object-cover"
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
      </div>
    );
  };
  
export default function DoctorsList() {
  return (
    <div>
        <div className="  grid grid-cols-4 gap-2 p-9 overflow-hidden">
        {doctor_features.map((feature, index) => (
          <DoctorCard2
            name={feature.name}
            specialization={feature.specialization}
            address={feature.address}
            stats={feature.stats}
            image={feature.img}
          ></DoctorCard2>
        ))}
      </div>
      <div className="  grid grid-cols-4 gap-2 p-9">
        {doctor_features.map((feature, index) => (
          <DoctorCard2
            name={feature.name}
            specialization={feature.specialization}
            image={feature.img}
          ></DoctorCard2>
        ))}
      </div>
    </div>
  )
}
