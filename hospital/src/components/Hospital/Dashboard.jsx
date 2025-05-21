import React, { useEffect, useState } from 'react';
import {
  FaHospitalSymbol,
  FaMapMarkerAlt,
  FaAmbulance,
  FaUserMd,
  FaProcedures,
  FaAward,
} from 'react-icons/fa';
import { getHospitalInfoByName } from '../../services/api';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { hospitalName } = useParams();
  const formattedHospitalName = hospitalName.replace(/-/g, ' ');
  const [hospitalInfo, setHospitalInfo] = useState({});

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const res = await getHospitalInfoByName(formattedHospitalName);
        setHospitalInfo(res.data);
      } catch (error) {
        console.error('Error fetching hospital info:', error);
      }
    };
    fetchHospitalInfo();
  }, [formattedHospitalName]);

  const hospitalData = hospitalInfo.data || {};

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-100 to-white p-10">
      {/* Hospital Header */}
      <div className="max-w-6xl mx-auto mb-12 rounded-3xl bg-white shadow-2xl p-10 text-center relative overflow-hidden">
        {/* Decorative Gradient Circle */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400 rounded-full opacity-20 filter blur-3xl"></div>

        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 flex justify-center items-center gap-3">
          {hospitalData.name || 'Loading...'}
          <span className="text-red-600 ml-2 text-3xl font-bold mt-2">MEDISENSE</span>
        </h1>

        <div className="flex justify-center mb-6">
          {hospitalData.hospitalImage ? (
            <img
              src={hospitalData.hospitalImage}
              alt={`${hospitalData.name} Image`}
              className="foverflow-hidden rounded-xl shadow-xl max-h-48 object-cover"
            />
          ) : (
            <div className="w-64 h-48 bg-gray-200 rounded-xl animate-pulse"></div>
          )}
        </div>

        <p className="text-gray-700 flex justify-center items-center gap-2 text-lg font-medium mb-3">
          <FaMapMarkerAlt className="text-blue-600" />
          {hospitalData.address || 'Loading address...'}
        </p>

        <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
          <FaAward className="inline mr-2" />
          {hospitalData.accreditation || 'Loading accreditation...'}
        </div>
      </div>

      {/* Key Statistics Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: <FaHospitalSymbol className="text-blue-600" />,
            label: 'Established',
            value: hospitalData.establishedYear || '-',
          },
          {
            icon: <FaProcedures className="text-green-600" />,
            label: 'Total Beds',
            value: hospitalData.beds || '-',
          },
          {
            icon: <FaUserMd className="text-yellow-600" />,
            label: 'Status',
            value: hospitalData.status || '-',
            valueClass: 'text-yellow-600 font-bold',
          },
          {
            icon: <FaAmbulance className="text-red-600" />,
            label: 'Ambulances',
            value: hospitalData.ambulance || '-',
          },
        ].map(({ icon, label, value, valueClass }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.05] transition-transform duration-300"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{label}</h3>
            <p className={`text-3xl font-extrabold ${valueClass || 'text-gray-800'}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Achievements + Facilities Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 mb-16">
        {/* Achievements */}
        <div className="flex-1 bg-blue-900 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-300 pb-2">
            Recent Achievements
          </h2>
          <div className="space-y-4">
            <ul className="list-disc list-inside space-y-3 text-lg text-white">
              <li>Center of Excellence in Cardiac Care</li>
              <li>Advanced Cardiac Care Unit</li>
              <li>Best Hospital Award 2023</li>
              <li>Green Hospital Certification</li>
            </ul>
          </div>
        </div>

        {/* Facilities */}
        <div className="flex-1 bg-gradient-to-tr from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 border-b border-blue-300 pb-2">
            Advanced Facilities
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>24/7 Emergency & Trauma Center</li>
            <li>Advanced Cardiac Care Unit</li>
            <li>Neonatal Intensive Care Unit (NICU)</li>
            <li>Robotic Surgery Center</li>
            <li>PET-CT Scan Technology</li>
          </ul>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="max-w-6xl mx-auto bg-red-600 rounded-3xl shadow-lg p-8 text-white flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 drop-shadow-lg">
            Emergency Services
          </h2>
          <p className="text-xl font-semibold drop-shadow-md">
            24/7 Emergency Care Available
          </p>
        </div>
        <div className="text-right mt-6 md:mt-0">
          <p className="text-4xl font-extrabold drop-shadow-md">
            {hospitalData.contact || '-'}
          </p>
          <p className="text-sm tracking-widest uppercase drop-shadow-sm">
            Immediate Assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
