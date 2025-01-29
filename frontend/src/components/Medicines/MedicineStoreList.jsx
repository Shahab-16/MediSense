import React from 'react';
import { Link } from 'react-router-dom';

// Dummy data for medicine stores with additional details
const stores = [
  { id: 1, name: "Store 1", image: "/path/to/image1.jpg", address: "Mumbai, India", contact: "+91 1234567890", rating: 4.5 },
  { id: 2, name: "Store 2", image: "/path/to/image2.jpg", address: "Delhi, India", contact: "+91 2345678901", rating: 4.0 },
  { id: 3, name: "Store 3", image: "/path/to/image3.jpg", address: "Bangalore, India", contact: "+91 3456789012", rating: 4.2 },
  { id: 4, name: "Store 4", image: "/path/to/image4.jpg", address: "Chennai, India", contact: "+91 4567890123", rating: 4.8 },
  { id: 5, name: "Store 5", image: "/path/to/image5.jpg", address: "Hyderabad, India", contact: "+91 5678901234", rating: 3.9 },
  { id: 6, name: "Store 6", image: "/path/to/image6.jpg", address: "Pune, India", contact: "+91 6789012345", rating: 4.3 },
  { id: 7, name: "Store 7", image: "/path/to/image7.jpg", address: "Kolkata, India", contact: "+91 7890123456", rating: 4.6 },
  { id: 8, name: "Store 8", image: "/path/to/image8.jpg", address: "Ahmedabad, India", contact: "+91 8901234567", rating: 4.4 },
  { id: 9, name: "Store 9", image: "/path/to/image9.jpg", address: "Jaipur, India", contact: "+91 9012345678", rating: 3.7 },
  { id: 10, name: "Store 10", image: "/path/to/image10.jpg", address: "Lucknow, India", contact: "+91 1023456789", rating: 4.1 },
  { id: 11, name: "Store 11", image: "/path/to/image11.jpg", address: "Kochi, India", contact: "+91 2134567890", rating: 4.7 },
  { id: 12, name: "Store 12", image: "/path/to/image12.jpg", address: "Chandigarh, India", contact: "+91 3245678901", rating: 4.0 },
];

const MedicineStoreList = () => {
  return (
    <div className="container mx-auto px-8 py-8 max-w-screen-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Top Quality Medicine Stores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-300">
            {/* Store Image */}
            <div className="h-48 w-full bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden mb-4">
              <img src={store.image} alt={store.name} className="h-full w-full object-cover" />
            </div>
            {/* Store Details */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{store.name}</h3>
            <p className="text-sm text-gray-500">{store.address}</p>
            <p className="text-sm text-gray-500 mt-2">Contact: {store.contact}</p>
            <p className="text-sm text-yellow-500 mt-2">Rating: {store.rating} ⭐</p>
            
            {/* Link to Store */}
            <Link to={`/dashboard/medicines/store/${store.id}`} className="text-blue-500 mt-4 block font-semibold hover:underline">
              Visit Store
            </Link>
          </div>
        ))}
      </div>
      <Link to="/dashboard/medicines/allstores" className="text-blue-500 mt-6 block text-center font-semibold hover:underline">
        View All Medicine Stores
      </Link>
    </div>
  );
};

export default MedicineStoreList;
