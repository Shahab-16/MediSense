import React from 'react';
import { features } from '../../assets/asset';

const FeatureCard = ({ title, description, image }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 m-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
};

const MedisenseDescription = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1400px]">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">Medisense Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MedisenseDescription;
