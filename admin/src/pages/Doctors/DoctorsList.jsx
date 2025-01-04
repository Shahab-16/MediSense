import React from "react";
import { doctors } from "../../assets/admin_assets/assets";
import { AiOutlineDelete } from "react-icons/ai";

const DoctorsList = () => {
  const handleRemove = (id) => {
    console.log(`Remove doctor with ID: ${id}`);
    // Add logic to remove the doctor
  };

  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-6 text-lg font-semibold border-b pb-4">
        <p className="text-center">Image</p>
        <p className="text-left">Name</p>
        <p className="text-left">Specialization</p>
        <p className="text-center">Experience</p>
        <p className="text-left">Availability</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Doctors */}
      <div className="flex flex-col gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="text-center">
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-[60px] h-[60px] rounded-md object-cover mx-auto"
              />
            </div>

            {/* Name */}
            <p className="text-left font-medium text-gray-800">{doctor.name}</p>

            {/* Specialization */}
            <p className="hidden sm:block text-left text-gray-600">
              {doctor.specialization}
            </p>

            {/* Experience */}
            <p className="hidden sm:block text-center text-gray-800">
              {doctor.experience} years
            </p>

            {/* Availability */}
            <p
              className={`text-left font-medium ${
                doctor.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {doctor.available ? "Available" : "Not Available"}
            </p>

            {/* Remove Button */}
            <div className="text-center">
              <button
                onClick={() => handleRemove(doctor.id)}
                className="text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
