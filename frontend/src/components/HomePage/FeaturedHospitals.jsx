// FeaturedHospitals.jsx
import React from 'react';
import { images } from '../../assets/asset';

export const FeaturedHospitals = () => {
  const hospitals = [
    {
      name: "Apollo Hospitals",
      location: "Chennai",
      image: "https://newassets.apollo247.com/cms/2022-02/Apollo%20Speciality%20Hospitals,%20Nellore.jpg",
      specialities: ["Cardiology", "Neurology", "Oncology"]
    },
    {
      name: "Fortis Hospital",
      location: "Mumbai",
      image: "https://www.visboo.com/wp-content/uploads/2017/04/ALL-ABOUT-FORTIS-HOSPITAL-DELHI.jpg",
      specialities: ["Orthopedics", "Dermatology", "Pediatrics"]
    },
    {
      name: "Manipal Hospitals",
      location: "Bangalore",
      image: images.hospital,
      specialities: ["Dentistry", "Ophthalmology", "Surgery"]
    }
  ];

  return (
    <div className="py-16 bg-gray-50 max-w-[1380px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Healthcare Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by India's leading hospitals and clinics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitals.map((hospital, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={hospital.image} 
                alt={hospital.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{hospital.name}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hospital.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialities.map((spec, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};