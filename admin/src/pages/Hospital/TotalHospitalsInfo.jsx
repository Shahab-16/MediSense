import React, { useEffect, useState } from "react";
import { listHospitals } from "../../services/api";

const TotalHospitalsInfo = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await listHospitals();
        console.log("API response:", res.hospitalsList);

        // Fix: Extract actual data array depending on your API structure
        const data = Array.isArray(res) ? res : res.hospitalsList;
        setHospitals(data || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);
  console.log("allhosptal",hospitals);
  const totalHospitals = hospitals.length;
  const totalBeds = hospitals.reduce((sum, h) => sum + (h.beds || 0), 0);
  const totalAmbulances = hospitals.reduce((sum, h) => sum + (h.ambulance || 0), 0);

  if (loading) {
    return <div className="p-6">Loading hospital data...</div>;
  }

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
              <p><span className="font-medium">Established:</span> {hospital.establishedYear || "N/A"}</p>
              <p><span className="font-medium">Beds:</span> {hospital.beds}</p>
              <p><span className="font-medium">Ambulances:</span> {hospital.ambulance}</p>
              <p><span className="font-medium">Contact:</span> {hospital.contact || "N/A"}</p>
              <p className="text-sm text-gray-500">{hospital.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalHospitalsInfo;
