// ServiceCards.jsx
import React from 'react';
import { 
  BuildingOffice2Icon, 
  UserGroupIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';

export const ServiceCards = () => {
  const services = [
    {
      title: "Connect with Hospitals",
      description: "Access 5000+ hospitals and clinics across India",
      icon: <BuildingOffice2Icon className="w-12 h-12 text-blue-600" />,
      link: "/hospitals"
    },
    {
      title: "Doctor Consultations",
      description: "Book online/offline appointments with specialists",
      icon: <UserGroupIcon className="w-12 h-12 text-green-600" />,
      link: "/doctors"
    },
    {
      title: "Medicine Delivery",
      description: "Get medicines delivered from local stores in 2 hours",
      icon: <TruckIcon className="w-12 h-12 text-purple-600" />,
      link: "/medicines"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Healthcare Made Simple
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 text-center mb-4">{service.description}</p>
                <a href={service.link} className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};