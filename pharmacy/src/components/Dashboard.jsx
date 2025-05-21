import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaPills,
  FaUsers,
  FaBoxOpen,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getStore } from "../services/api";

const Dashboard = () => {
  const [pharmacyInfo, setPharmacyInfo] = useState({});
  const { pharmacyName } = useParams();
  const formattedName = pharmacyName.replace(/-/g, " ");
  console.log("name after removing hyphen", formattedName);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const res = await getStore(formattedName);
        console.log("pharmacyInfo from API:", res.data);
        setPharmacyInfo(res.data.data);
      } catch (error) {
        console.log("error in fetching the pharmacy info", error.message);
      }
    };
    fetchPharmacy();
  }, [formattedName]);

  useEffect(() => {
    console.log("pharmacyInfo updated in state:", pharmacyInfo);
  }, [pharmacyInfo]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-blue-800">{pharmacyInfo.name} Dashboard</div>
          <div>
            Welcome to your pharmacy management system
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Medicines */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaPills className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-blue-800">
                {pharmacyInfo.medicines?.length ?? 0}
              </p>
            </div>
          </div>

          {/* Owner Name */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <FaUsers className="text-yellow-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Owner Name</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pharmacyInfo.ownerName ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaBoxOpen className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p className="text-2xl font-bold text-green-600 capitalize">
                {pharmacyInfo.status ?? "unknown"}
              </p>
            </div>
          </div>

          {/* Established Year */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Established</p>
              <p className="text-2xl font-bold text-purple-600">
                {pharmacyInfo.establishedYear ?? "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Low Stock Medicines Section */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Low Stock Medicines
          </h2>
          <hr />
          <ul className="list-disc list-inside space-y-2 text-white">
            <li>Paracetamol - 5 units left</li>
            <li>Ibuprofen - 3 units left</li>
            <li>Amoxicillin - 2 units left</li>
            <li>Azithromycin - 4 units left</li>
            <li>Loratadine - 1 unit left</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 shadow-lg mt-auto rounded-t-lg border border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Contact Information</h3>
          <ul className="space-y-1 text-gray-700">
            {pharmacyInfo.contact && (
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-500" />
                {pharmacyInfo.contact}
              </li>
            )}
            {pharmacyInfo.email && (
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" />
                {pharmacyInfo.email}
              </li>
            )}
            {pharmacyInfo.address && (
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                {pharmacyInfo.address}
              </li>
            )}
            {!pharmacyInfo.phone && !pharmacyInfo.email && !pharmacyInfo.address && (
              <li className="text-gray-500">No contact information available.</li>
            )}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
