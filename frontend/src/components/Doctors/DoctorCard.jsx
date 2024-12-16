import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorCard = ({name, specialization, image}) => {
  const navigate=useNavigate();
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
  )
}

export default DoctorCard
