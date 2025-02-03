// ConsultationType.jsx
import React, { useState } from 'react';

export const ConsultationType = () => {
  const [selectedType, setSelectedType] = useState('online');

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Consultation Type</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get medical advice from the comfort of your home or visit our partner clinics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedType === 'online' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-400'
            }`}
            onClick={() => setSelectedType('online')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Online Consultation</h3>
              <p className="text-gray-600 text-center mb-4">
                Video call with verified doctors. Available 24/7
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Book Video Call
              </button>
            </div>
          </div>

          <div 
            className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedType === 'offline' 
                ? 'border-green-600 bg-green-50' 
                : 'border-gray-200 hover:border-green-400'
            }`}
            onClick={() => setSelectedType('offline')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Clinic Visit</h3>
              <p className="text-gray-600 text-center mb-4">
                Book in-person appointments at nearby clinics
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Find Clinics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};