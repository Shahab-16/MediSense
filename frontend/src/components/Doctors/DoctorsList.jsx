import React from 'react';
import { doctors} from '../../assets/asset';
import DoctorCard from './DoctorCard';
import { useNavigate } from 'react-router-dom';

export default function DoctorsList({specialization}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/doctors/alldoctors');
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 p-9 overflow-hidden">
  {doctors.map((feature, index) => {
    if (specialization === 'ALL' || feature.specialization === specialization) {
      return (
        <DoctorCard
          key={index}
          name={feature.name}
          specialization={feature.specialization}
          address={feature.address}
          stats={`Experience: ${feature.experience} years, Success Rate: ${feature.success_rate}%`}
          image={feature.img}
          {...feature}
        />
      );
    }
  })}
</div>

      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="bg-[#EAEFFF] text-gray-600 px-12 py-4 rounded-full mt-10"
        >
          More
        </button>
      </div>
    </div>
  );
}
