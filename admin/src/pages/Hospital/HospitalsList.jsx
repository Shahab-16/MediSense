import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { assets } from "../../assets/admin_assets/assets";
import { AllHospitals } from "../../assets/admin_assets/assets";
import { useNavigate } from "react-router-dom";

const HospitalsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleRemove = (id) => {
    console.log(`Remove doctor with ID: ${id}`);
    // Add logic to remove the doctor
  };
  const filteredHospitals = AllHospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
      {/* Button to Add Doctors */}
      <span className="flex justify-center">
        <button
          onClick={() => navigate("/admin/doctors/add-doctors")}
          className="text-white bg-blue-800 p-2 rounded-md"
        >
          Add Hospital +
        </button>
      </span>

      {/* Search Box with Icon */}
      <span className="flex justify-center">
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" size={20} />
          <input
            className="p-2 pl-10 w-full rounded-lg border shadow-sm"
            placeholder="Search Hospitals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </span>

      {/* Header */}
      <div className="hidden ml-[3.2%] sm:grid sm:grid-cols-6 gap-6 text-lg font-semibold border-b pb-4">
        <p className="text-center">Image</p>
        <p className="text-left">Name</p>
        <p className="text-left">Location</p>
        <p className="text-left">Contact</p>
        <p className="text-center">Open/Close</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Filtered Hospitals List */}
      <div className="flex flex-col gap-6 text-lg border-b pb-4">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <div
              key={hospital.hospitalId}
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="text-center ml-[25%]">
                <img
                  src={assets.hospital}
                  alt={hospital.name}
                  className="w-[60px] h-[60px] rounded-md object-cover mx-auto"
                />
              </div>

              {/* Name */}
              <p className="text-left font-medium text-gray-800">
                {hospital.name}
              </p>

              {/* Address */}
              <p className="hidden sm:block text-left text-gray-600">
                {hospital.address}
              </p>

              {/* Contact */}
              <p className="hidden sm:block text-left text-gray-800">
                {hospital.contact}
              </p>

              {/* Availability */}
              <p
                className={`text-center font-medium ${
                  hospital.open ? "text-green-600" : "text-red-600"
                }`}
              >
                {hospital.open ? "Open" : "Close"}
              </p>

              {/* Remove Button */}
              <div className="text-center">
                <button
                  onClick={() => handleRemove(hospital.hospitalId)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          ))) : (
          <p className="text-center text-gray-600">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default HospitalsList;
