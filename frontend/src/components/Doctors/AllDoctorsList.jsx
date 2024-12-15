import React from 'react'
import { images } from '../../assets/asset'
import { doctors } from '../../assets/asset';
import DoctorCard from './DoctorCard';

export default function AllDoctorsList() {
  return (
    <div>
        <div className="  grid grid-cols-4 gap-2 p-9 overflow-hidden">
        {doctors.map((feature, index) => (
          <DoctorCard
            name={feature.name}
            specialization={feature.specialization}
            image={feature.img}
          ></DoctorCard>
        ))}
      </div>
    </div>
  )
}
