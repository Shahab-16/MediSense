import React from 'react';
import AllDoctorsList from '../../components/Doctors/AllDoctorsList';
import { doctor_specializations } from '../../assets/asset';

const DoctorsListPage = () => {
  return (
    <div className="flex">
      {/* Specializations Sidebar */}
      <div className="mt-[3%] w-1/4">
        <p className="p-2 text-black font-bold">Browse through the doctors specialist.</p>
        {doctor_specializations.map((specialization, index) => (
          <p
            key={index}
            className="border p-2 rounded-md font-outfit m-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
          >
            {specialization.name}
          </p>
        ))}
      </div>
      
      {/* Doctors List */}
      <div className="mt-[3%] w-3/4">
        <AllDoctorsList />
      </div>
    </div>
  );
};

export default DoctorsListPage;
