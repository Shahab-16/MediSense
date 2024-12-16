import React from 'react';
import {
  FaHeartbeat,
  FaBrain,
  FaChild,
  FaStethoscope,
  FaUserMd,
  FaLungs,
  FaEye,
  FaBone,
  FaMicroscope,
  FaSyringe,
} from 'react-icons/fa';
import { GiKidneys, GiLiver, GiScalpel } from 'react-icons/gi';
import { MdOutlinePsychology } from 'react-icons/md';
import { doctor_specializations } from '../../assets/asset';

const Speciality = ({specialization,setSpecialization}) => {
  // Map icons to specializations
  const specializationIcons = {
    "Heart specialist": <FaHeartbeat />,
    Endocrinologist: <FaStethoscope />,
    Oncologist: <FaMicroscope />,
    Dermatologist: <FaUserMd />,
    "Orthopedic Surgeon": <FaBone />,
    Pediatrician: <FaChild />,
    Neurologist: <FaBrain />,
    Gynecologist: <FaUserMd />,
    Psychiatrist: <MdOutlinePsychology />,
    "ENT Specialist": <FaStethoscope />,
    Cardiologist: <FaHeartbeat />,
    Radiologist: <FaMicroscope />,
    Gastroenterologist: <GiLiver />,
    Pulmonologist: <FaLungs />,
    Urologist: <GiKidneys />,
    Ophthalmologist: <FaEye />,
    Nephrologist: <GiKidneys />,
    "General Physician": <FaStethoscope />,
    "Plastic Surgeon": <GiScalpel />,
    Rheumatologist: <FaSyringe />,
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1250px] mx-auto mt-4">
      <div className="text-[50px] font-medium">
        <h1>Find By Speciality</h1>
      </div>
      <div className="w-[55%] mx-auto">
        <p>
          Simply browse through our extensive list of trusted doctors, each
          with a proven track record of excellence in their field, and schedule
          your appointment hassle-free at your convenience.
        </p>
      </div>
      {/* Horizontal slider */}
      <div className="flex gap-8 overflow-x-auto p-1 text-center scrollbar-hide">
        {doctor_specializations.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setSpecialization((prev) =>
                prev === item.name ? "All" : item.name
              )
            }
            className={`flex flex-col items-center gap-2 min-w-[150px] p-4 rounded-lg shadow-md cursor-pointer ${
              specialization === item.name
                ? "border-2 border-blue-600 bg-blue-100"
                : "border border-gray-300 bg-white"
            } hover:bg-blue-50`}
          >
            <div className="text-[40px] text-blue-600">
              {specializationIcons[item.name] || <FaUserMd />}
            </div>
            <p className="text-gray-700 font-medium">{item.name}</p>
          </div>
        ))}
      </div>
      {/* <div className="mt-[5%]">
        <div className="text-[35px] font-bold">Top Doctors To Book</div>
        <p>Simply browse through our extensive list of trusted doctors.</p>
      </div> */}
    </div>
  );
};

export default Speciality;
