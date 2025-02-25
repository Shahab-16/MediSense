import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const HospitalInformation = () => {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "IGH Hospital",
    address: "123 Health Street, Medical City, MC 45001",
    contact: "911-222-3333",
    established: 1998,
    beds: 450,
    ambulanceCount: 12,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalInfo({ ...hospitalInfo, [name]: value });
  };

  const handleSave = () => {
    // Simulate API call to save data
    toast.success("Hospital information saved successfully!");
    console.log("Saved Data:", hospitalInfo);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Edit Hospital Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Hospital Name</label>
          <input
            type="text"
            name="name"
            value={hospitalInfo.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={hospitalInfo.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={hospitalInfo.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Year Established</label>
          <input
            type="number"
            name="established"
            value={hospitalInfo.established}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Total Beds</label>
          <input
            type="number"
            name="beds"
            value={hospitalInfo.beds}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Ambulance Count</label>
          <input
            type="number"
            name="ambulanceCount"
            value={hospitalInfo.ambulanceCount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default HospitalInformation;