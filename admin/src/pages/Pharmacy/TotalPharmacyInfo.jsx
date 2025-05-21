import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { listPharmacies } from "../../services/api";

const TotalPharmaciesInfo = () => {
  const [pharmacies,setAllpharmacy]=useState([]);
  useEffect(()=>{
    const fetchPharmacy=async()=>{
      try{
        const  res=await listPharmacies();
        console.log("API RESPONSE",res.pharmaciesList);
        setAllpharmacy(res.pharmaciesList);
      }
      catch(error){
        console.log("error in fetching the pharmacies",error);
      }
    }
    fetchPharmacy();
  },[])
  // Dummy data for registered pharmacies
  // Calculate totals
  const totalPharmacies = pharmacies.length;
  let totalMedicines=0;
  for(let i=0;i<pharmacies.length;i++){
    totalMedicines+=pharmacies[i].medicines.length;
  }
  const pharmaciesWithDelivery = pharmacies.filter(
    (pharmacy) => pharmacy.deliveryService
  ).length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        MedISENSE Pharmacy Network
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-600 font-semibold">Total Pharmacies</h3>
          <p className="text-3xl font-bold text-blue-800">{totalPharmacies}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-600 font-semibold">Total Medicines Available</h3>
          <p className="text-3xl font-bold text-green-800">{totalMedicines}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-purple-600 font-semibold">Pharmacies with Delivery</h3>
          <p className="text-3xl font-bold text-purple-800">
            {pharmaciesWithDelivery}
          </p>
        </div>
      </div>

      {/* List of Pharmacies */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Registered Pharmacies
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              {pharmacy.name}
            </h4>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Established:</span>{" "}
                {pharmacy.establishedYear}
              </p>
              <p>
                <span className="font-medium">Medicines Available:</span>{" "}
                {pharmacy.medicines.length}
              </p>
              <p>
                <span className="font-medium">Delivery Service:</span>{" "}
                {pharmacy.deliveryService ? "Available" : "Not Available"}
              </p>
              <p>
                <span className="font-medium">Working Hours:</span>{" "}
                {pharmacy.workingHours}
              </p>
              <p>
                <span className="font-medium">Contact:</span> {pharmacy.contact}
              </p>
              <p className="text-sm text-gray-500">{pharmacy.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalPharmaciesInfo;