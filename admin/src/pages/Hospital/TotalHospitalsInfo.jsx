import React from "react";

const TotalHospitalsInfo = () => {
  // Dummy data for registered hospitals
  const hospitals = [
    {
      id: 1,
      name: "MedISENSE General Hospital",
      address: "123 Health Street, Medical City, MC 45001",
      contact: "911-222-3333",
      established: 1998,
      beds: 450,
      ambulanceCount: 12,
      specialty: "Multi-Specialty"
    },
    {
      id: 2,
      name: "City Central Hospital",
      address: "456 Wellness Avenue, Metro City, MC 67002",
      contact: "922-333-4444",
      established: 2005,
      beds: 300,
      ambulanceCount: 8,
      specialty: "Cardiology"
    },
    {
      id: 3,
      name: "Northside Medical Center",
      address: "789 Care Road, Suburbia, SB 88005",
      contact: "933-444-5555",
      established: 2010,
      beds: 200,
      ambulanceCount: 5,
      specialty: "Orthopedics"
    }
  ];

  // Calculate totals
  const totalHospitals = hospitals.length;
  const totalBeds = hospitals.reduce((sum, hospital) => sum + hospital.beds, 0);
  const totalAmbulances = hospitals.reduce((sum, hospital) => sum + hospital.ambulanceCount, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">MedISENSE Hospital Network</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-600 font-semibold">Total Hospitals</h3>
          <p className="text-3xl font-bold text-blue-800">{totalHospitals}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-600 font-semibold">Total Beds Available</h3>
          <p className="text-3xl font-bold text-green-800">{totalBeds}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-red-600 font-semibold">Total Ambulances</h3>
          <p className="text-3xl font-bold text-red-800">{totalAmbulances}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Registered Hospitals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{hospital.name}</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Established:</span> {hospital.established}</p>
              <p><span className="font-medium">Specialty:</span> {hospital.specialty}</p>
              <p><span className="font-medium">Beds:</span> {hospital.beds}</p>
              <p><span className="font-medium">Ambulances:</span> {hospital.ambulanceCount}</p>
              <p><span className="font-medium">Contact:</span> {hospital.contact}</p>
              <p className="text-sm text-gray-500">{hospital.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalHospitalsInfo;