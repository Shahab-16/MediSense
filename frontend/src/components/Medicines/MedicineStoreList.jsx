import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../services/axios';
import { FaClinicMedical, FaPills, FaStar, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { getMedicalStores } from '../../services/axios';
const MedicineStoreList = () => {
  const [allStores,setStores]=useState([]);
  useEffect(()=>{
    const fecthMedicals=async()=>{
      try{
        const res=await getMedicalStores();
        console.log("fetched medicals",res);
        setStores(res);
      } catch(error){
        console.log("can not fetch the medical from backend",error);
      }
    }
    fecthMedicals();
  },[])
  // const stores = [
  //   { 
  //     id: 1, 
  //     name: "HealthCare Mumbai", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic1",
  //     address: "Marine Drive, Mumbai",
  //     contact: "+91 22 2654 7890",
  //     rating: 4.8,
  //     medicinesAvailable: 245,
  //     yearsActive: 12
  //   },
  //   { 
  //     id: 2, 
  //     name: "Delhi Meds Corner", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic2",
  //     address: "Connaught Place, Delhi",
  //     contact: "+91 11 4356 7890",
  //     rating: 4.6,
  //     medicinesAvailable: 215,
  //     yearsActive: 8
  //   },
  //   { 
  //     id: 3, 
  //     name: "Bangalore Pharma Hub", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic3",
  //     address: "MG Road, Bangalore",
  //     contact: "+91 80 2678 9012",
  //     rating: 4.9,
  //     medicinesAvailable: 278,
  //     yearsActive: 15
  //   },
  //   { 
  //     id: 4, 
  //     name: "Chennai Medicals", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic4",
  //     address: "Anna Salai, Chennai",
  //     contact: "+91 44 2890 1234",
  //     rating: 4.4,
  //     medicinesAvailable: 198,
  //     yearsActive: 10
  //   },
  //   { 
  //     id: 5, 
  //     name: "Hyderabad Health Plus", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic5",
  //     address: "Banjara Hills, Hyderabad",
  //     contact: "+91 40 2789 0123",
  //     rating: 4.7,
  //     medicinesAvailable: 234,
  //     yearsActive: 9
  //   },
  //   { 
  //     id: 6, 
  //     name: "Pune Wellness Pharmacy", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic6",
  //     address: "FC Road, Pune",
  //     contact: "+91 20 2678 3456",
  //     rating: 4.3,
  //     medicinesAvailable: 187,
  //     yearsActive: 7
  //   },
  //   { 
  //     id: 7, 
  //     name: "Kolkata Care Meds", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic7",
  //     address: "Park Street, Kolkata",
  //     contact: "+91 33 2456 7890",
  //     rating: 4.5,
  //     medicinesAvailable: 205,
  //     yearsActive: 11
  //   },
  //   { 
  //     id: 8, 
  //     name: "Ahmedabad Medico", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic8",
  //     address: "CG Road, Ahmedabad",
  //     contact: "+91 79 2789 0123",
  //     rating: 4.2,
  //     medicinesAvailable: 176,
  //     yearsActive: 6
  //   },
  //   // Continue adding more entries up to 20...
  //   { 
  //     id: 20, 
  //     name: "Goa Pharma Solutions", 
  //     image: "https://source.unsplash.com/random/400x300/?pharmacy,clinic20",
  //     address: "Panaji, Goa",
  //     contact: "+91 832 245 6789",
  //     rating: 4.6,
  //     medicinesAvailable: 221,
  //     yearsActive: 8
  //   }
  // ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
          <FaClinicMedical className="text-blue-600 text-5xl" />
          <span>Medisense Pharmacy Network</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl w-64">
            <FaClinicMedical className="text-blue-600 text-4xl mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-800">20+</div>
            <div className="text-gray-600">Partner Pharmacies</div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl w-64">
            <FaPills className="text-green-600 text-4xl mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-800">200+</div>
            <div className="text-gray-600">Quality Medicines</div>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Connecting you with trusted pharmacies across India, offering genuine medicines with 
          24/7 availability and expert pharmaceutical guidance.
        </p>
      </div>

      {/* Store List Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Premium Pharmacy Partners
        </h2>
        <p className="text-gray-600 text-lg">
          Verified pharmacies with quality assurance and fast delivery
        </p>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {allStores.map((store) => (
          <div key={store.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {store.rating > 4.5 && (
              <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <FaStar className="text-yellow-500" /> Premium Partner
              </div>
            )}
            
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={store.pharmacyImage}
                alt={store.name} 
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{store.name}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span className="text-sm">{store.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <FaPhoneAlt className="text-green-500" />
                <span className="text-sm">{store.contact}</span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{store.rating}</span>
                  <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 500 + 100)} reviews)</span>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {store.yearsActive}+ years
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Medicines Available:</span>
                <span className="font-semibold">{store.medicinesAvailable}+</span>
              </div>

              <Link 
                to={`/dashboard/medicines/store/${store.name}`}
                className="mt-4 w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaClinicMedical /> Visit Store
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link 
          to="/dashboard/medicines/allstores"
          className="inline-block px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
        >
          Explore All 20 Pharmacies →
        </Link>
      </div>

      {/* Trust Badge */}
      <div className="mt-12 text-center text-gray-600 border-t pt-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <FaStar className="text-yellow-400" />
          <FaClinicMedical className="text-blue-600" />
          <FaPills className="text-green-600" />
        </div>
        <p className="text-sm">
          100% Verified Pharmacies | Genuine Medicines Guarantee | 24/7 Support
        </p>
      </div>
    </div>
  );
};

export default MedicineStoreList;