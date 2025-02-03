import React from 'react'
import { FaHospital } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/asset';

const hospitals = [
  { id: 1, name: "Hospital 1", image: images.hospital, address: "Mumbai, India", contact: "+91 1234567890", rating: 4.5 },
  { id: 2, name: "Hospital 2", image: images.hospital, address: "Delhi, India", contact: "+91 2345678901", rating: 4.0 },
  { id: 3, name: "Hospital 3", image: images.hospital, address: "Bangalore, India", contact: "+91 3456789012", rating: 4.2 },
  { id: 4, name: "Hospital 4", image: images.hospital, address: "Chennai, India", contact: "+91 4567890123", rating: 4.8 },
  { id: 5, name: "Hospital 5", image: images.hospital, address: "Hyderabad, India", contact: "+91 5678901234", rating: 3.9 },
  { id: 6, name: "Hospital 6", image: images.hospital, address: "Pune, India", contact: "+91 6789012345", rating: 4.3 },
  { id: 7, name: "Hospital 7", image: images.hospital, address: "Kolkata, India", contact: "+91 7890123456", rating: 4.6 },
  { id: 8, name: "Hospital 8", image: images.hospital, address: "Ahmedabad, India", contact: "+91 8901234567", rating: 4.4 },
  { id: 9, name: "Hospital 9", image: images.hospital, address: "Jaipur, India", contact: "+91 9012345678", rating: 3.7 },
  { id: 10, name: "Hospital 10", image: images.hospital, address: "Lucknow, India", contact: "+91 1023456789", rating: 4.1 },
  { id: 11, name: "Hospital 11", image: images.hospital, address: "Kochi, India", contact: "+91 2134567890", rating: 4.7 },
  { id: 12, name: "Hospital 12", image: images.hospital, address: "Chandigarh, India", contact: "+91 3245678901", rating: 4.0 },
];
export default function Hospitals() {
  const navigate=useNavigate();
  return (
    <div className="container mx-auto px-8 py-8 max-w-screen-xl">
      <div className='flex flex-col items-center text-center'>
        <img className='w-40 mb-4' src={images.health_logo} alt="Health Logo" />
        <p className='text-3xl font-bold text-blacl'>Find the Best Hospitals Near You</p>
      </div>
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {hospitals.map((hospital) => (
          <div key={hospital.id} className='bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:cursor-pointer'>
            <Link to={`/dashboard/doctors/hospital/${hospital.id}`}>
            <img  src={hospital.image} alt={hospital.name} className="h-48 w-full object-cover " />
            </Link>
            <div className='p-4'>
              <h2 className='text-xl font-bold text-gray-800'>{hospital.name}</h2>
              <p className='text-gray-600'>{hospital.address}</p>
              <p className='text-gray-500'>{hospital.contact}</p>
              <p className='text-green-600 font-semibold'>⭐ {hospital.rating}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link to='/' className='block text-center text-blue-600 font-semibold mt-6 hover:underline'>View all hospitals</Link>
      
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 px-8 flex flex-col items-center rounded-lg shadow-lg">
        <FaHospital className="text-4xl mb-3" />
        <h1 className="text-2xl font-bold">Caring for You, Every Step of the Way</h1>
        <p className="text-lg mt-2">Your health, our priority. Find the best care near you.</p>
      </div>
    </div>
  )
}
