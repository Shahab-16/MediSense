import React from 'react';
import { FaHospitalSymbol, FaMapMarkerAlt, FaAmbulance, FaUserMd, FaProcedures, FaHeartbeat, FaAward } from 'react-icons/fa';

const Dashboard = () => {
  // Hospital information data
  const hospitalInfo = {
    name: "IGH Hospital",
    address: "123 Health Street, Medical City, MC 45001",
    established: 1998,
    beds: 450,
    departments: 28,
    ambulanceCount: 12,
    emergencyContact: "911-222-3333",
    accreditation: "JCI Accredited",
    specialties: [
      "Cardiology", "Oncology", "Neurology", 
      "Orthopedics", "Pediatrics", "Emergency Medicine"
    ],
    achievements: [
      "Center of Excellence in Cardiac Care",
      "Best Hospital Award 2023",
      "Green Hospital Certification"
    ]
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      {/* Hospital Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          {hospitalInfo.name}
          <span className="text-red-600 ml-2">MEDISENSE</span>
        </h1>
        <p className="text-gray-600 flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2 text-blue-600" />
          {hospitalInfo.address}
        </p>
        <div className="mt-4 bg-blue-700 text-white p-2 rounded-lg inline-block">
          <span className="flex items-center">
            <FaAward className="mr-2" />
            {hospitalInfo.accreditation}
          </span>
        </div>
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold mb-2 flex items-center">
            <FaHospitalSymbol className="mr-2" /> Established
          </h3>
          <p className="text-3xl font-bold text-gray-700">{hospitalInfo.established}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold mb-2 flex items-center">
            <FaProcedures className="mr-2" /> Total Beds
          </h3>
          <p className="text-3xl font-bold text-gray-700">{hospitalInfo.beds}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold mb-2 flex items-center">
            <FaUserMd className="mr-2" /> Departments
          </h3>
          <p className="text-3xl font-bold text-gray-700">{hospitalInfo.departments}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold mb-2 flex items-center">
            <FaAmbulance className="mr-2" /> Ambulances
          </h3>
          <p className="text-3xl font-bold text-gray-700">{hospitalInfo.ambulanceCount}</p>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Key Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hospitalInfo.specialties.map((specialty, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <FaHeartbeat className="text-red-600 mr-2" />
              <span className="text-gray-700">{specialty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-800 text-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Advanced Facilities</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>24/7 Emergency & Trauma Center</li>
            <li>Advanced Cardiac Care Unit</li>
            <li>Neonatal Intensive Care Unit (NICU)</li>
            <li>Robotic Surgery Center</li>
            <li>PET-CT Scan Technology</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {hospitalInfo.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <FaAward className="text-blue-700 mr-2 mt-1" />
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="bg-red-600 text-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Emergency Services</h2>
            <p className="text-lg">24/7 Emergency Care Available</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{hospitalInfo.emergencyContact}</p>
            <p className="text-sm">Immediate Assistance</p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold">Patient Satisfaction</h3>
          <p className="text-3xl font-bold text-gray-700">98%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold">Annual Surgeries</h3>
          <p className="text-3xl font-bold text-gray-700">15,000+</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-blue-700 font-bold">ICU Beds</h3>
          <p className="text-3xl font-bold text-gray-700">75</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;