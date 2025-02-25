import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaHospital, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

const PharmacyInformation = () => {
  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: "MediCare Pharmacy",
    address: "123 Health Street, Medical City, MC 45001",
    contact: "911-222-3333",
    owner: "John Doe",
    licenseNumber: "PH123456789",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacyInfo({ ...pharmacyInfo, [name]: value });
  };

  const handleSave = () => {
    toast.success("Pharmacy information saved successfully!");
    console.log("Saved Data:", pharmacyInfo);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-4">
            Pharmacy Information
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaHospital className="mr-2 text-blue-600" />
                Pharmacy Name
              </label>
              <input
                type="text"
                name="name"
                value={pharmacyInfo.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={pharmacyInfo.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaPhone className="mr-2 text-blue-600" />
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={pharmacyInfo.contact}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Owner Name
              </label>
              <input
                type="text"
                name="owner"
                value={pharmacyInfo.owner}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                License Number
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={pharmacyInfo.licenseNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyInformation;