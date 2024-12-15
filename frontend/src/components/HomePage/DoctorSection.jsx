import React from "react";
import { doctors } from "../../assets/asset";
import DoctorCard from "../Doctors/DoctorCard";

const DoctorSection = () => {
  const topDoctors = [...doctors]
      .sort((a, b) => b.success_rate - a.success_rate)
      .slice(0, 8);
  return (
    <div>
      <div className="flex items-center justify-center lg:max-w-[1400px] text-3xl font-bold">
        Our High Qualified Doctors
      </div>
      <div className="  grid grid-cols-4 gap-2 p-9">
        {topDoctors.map((feature, index) => (
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
