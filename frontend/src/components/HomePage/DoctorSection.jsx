import React from "react";
import { doctors } from "../../assets/asset";
import DoctorCard from "../Doctors/DoctorCard";

const DoctorSection = () => {
  const topDoctors = [...doctors]
    .sort((a, b) => b.success_rate - a.success_rate)
    .slice(0, 8);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Our Highly Qualified Doctors
        </h2>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
        {topDoctors.map((feature, index) => (
          <div
            key={index}
            className="w-full flex justify-center"
          >
            <DoctorCard
              name={feature.name}
              specialization={feature.specialization}
              address={feature.address}
              stats={feature.stats}
              image={feature.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSection;
