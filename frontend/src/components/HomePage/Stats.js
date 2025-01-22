import React, { useContext } from 'react';
import { StoreContext} from '../../context/StoreContext'; 
import { statsDescription } from '../../assets/asset';

const StatsCard = ({ title, value,description}) => {
    return (
        <div className="bg-white shadow-xl rounded-lg p-6 m-4 text-center" id='about'>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-5xl font-bold text-blue-600">{value}+</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const StatsSection = () => {
    const { stats } = useContext(StoreContext)

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1400px]">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">Website Statistics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard title="Doctors Available" value={stats.doctorsAvailable} description="Qualified doctors ready to assist." />
                <StatsCard title="Total Medicines" value={stats.totalMedicines} description="Wide range of medicines available."/>
                <StatsCard title="Total Models" value={stats.totalModels} description="High-accuracy disease prediction models." />
            </div>
        </div>
    );
};

export default StatsSection;
