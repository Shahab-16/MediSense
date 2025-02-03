import React from "react";
import { BeakerIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const MedicineCard = () => {
  return (
    <div className="mx-auto max-w-7xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Smart Medicine Delivery
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your health essentials delivered fast, with care from trusted pharmacies nationwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pharmacy Network Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col items-center">
            <div className="mb-6 bg-blue-100 p-4 rounded-full">
              <BeakerIcon className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Nationwide Pharmacy Network
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Access 10,000+ verified pharmacies across India. Compare prices, check availability,
              and choose your preferred store.
            </p>
            <span className="text-blue-600 text-sm font-medium">
              Explore Stores →
            </span>
          </div>
        </div>

        {/* Delivery Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col items-center">
            <div className="mb-6 bg-green-100 p-4 rounded-full">
              <TruckIcon className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Lightning-Fast Delivery
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Get medicines delivered in as little as 2 hours. Real-time tracking and SMS updates
              ensure you're always informed.
            </p>
            <span className="text-green-600 text-sm font-medium">
              Track Order →
            </span>
          </div>
        </div>

        {/* Safety Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col items-center">
            <div className="mb-6 bg-purple-100 p-4 rounded-full">
              <ShieldCheckIcon className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Safe & Secure Service
            </h3>
            <p className="text-gray-600 text-center mb-4">
              100% verified medications with quality checks. Secure payments and prescription
              protection guaranteed.
            </p>
            <span className="text-purple-600 text-sm font-medium">
              Learn More →
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-full shadow-md">
          <span className="text-gray-600">Featured on:</span>
          <span className="font-bold text-blue-600">5,000+ Pharmacies</span>
          <span className="text-gray-400">•</span>
          <span className="font-bold text-green-600">24/7 Service</span>
          <span className="text-gray-400">•</span>
          <span className="font-bold text-purple-600">1M+ Deliveries</span>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;