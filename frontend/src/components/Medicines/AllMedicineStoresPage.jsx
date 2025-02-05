import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCrown, FaStar, FaFilter, FaSearch, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

// Updated dummy data with premium status
const stores = [
  { id: 1, name: "Elite Meds Mumbai", image: "https://source.unsplash.com/random/400x300/?pharmacy1", address: "Marine Drive, Mumbai", contact: "+91 22 2654 7890", rating: 4.8, premium: true, yearsActive: 12, medicinesAvailable: 245 },
  { id: 2, name: "Delhi Care Pharmacy", image: "https://source.unsplash.com/random/400x300/?pharmacy2", address: "Connaught Place, Delhi", contact: "+91 11 4356 7890", rating: 4.6, premium: true, yearsActive: 8, medicinesAvailable: 215 },
  { id: 3, name: "City Meds Bangalore", image: "https://source.unsplash.com/random/400x300/?pharmacy3", address: "MG Road, Bangalore", contact: "+91 80 2678 9012", rating: 4.9, premium: true, yearsActive: 15, medicinesAvailable: 278 },
  { id: 4, name: "Chennai Pharma Hub", image: "https://source.unsplash.com/random/400x300/?pharmacy4", address: "Anna Salai, Chennai", contact: "+91 44 2890 1234", rating: 4.4, premium: false, yearsActive: 10, medicinesAvailable: 198 },
  { id: 5, name: "Hyderabad Health Plus", image: "https://source.unsplash.com/random/400x300/?pharmacy5", address: "Banjara Hills, Hyderabad", contact: "+91 40 2789 0123", rating: 4.7, premium: true, yearsActive: 9, medicinesAvailable: 234 },
  { id: 6, name: "Pune Wellness Center", image: "https://source.unsplash.com/random/400x300/?pharmacy6", address: "FC Road, Pune", contact: "+91 20 2678 3456", rating: 4.3, premium: false, yearsActive: 7, medicinesAvailable: 187 },
  { id: 7, name: "Kolkata Medico", image: "https://source.unsplash.com/random/400x300/?pharmacy7", address: "Park Street, Kolkata", contact: "+91 33 2456 7890", rating: 4.5, premium: true, yearsActive: 11, medicinesAvailable: 205 },
  { id: 8, name: "Ahmedabad Pharma", image: "https://source.unsplash.com/random/400x300/?pharmacy8", address: "CG Road, Ahmedabad", contact: "+91 79 2789 0123", rating: 4.2, premium: false, yearsActive: 6, medicinesAvailable: 176 },
  // ... Add more stores up to 14
];

const AllMedicineStoresPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'premium' && store.premium) || 
                         (filter === 'non-premium' && !store.premium);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header and Filters */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Explore Our Pharmacy Network
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex items-center bg-white border rounded-lg p-2 w-full sm:w-64">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search pharmacies..."
              className="flex-1 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-white border rounded-lg p-2 w-full sm:w-64">
            <FaFilter className="text-blue-600" />
            <select 
              className="outline-none bg-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Pharmacies</option>
              <option value="premium">Premium Stores</option>
              <option value="non-premium">Standard Stores</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      {filteredStores.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No pharmacies found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative">
              {store.premium && (
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <FaCrown className="text-yellow-500" /> Premium
                </div>
              )}

              <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                <img 
                  src="https://uniquekiosk.com/wp-content/uploads/2020/08/39-10-1536x877.jpg"
                  alt={store.name} 
                  className="w-full h-full object-cover"
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
                    <span className="text-gray-500 text-sm">({store.medicinesAvailable}+ meds)</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                    {store.yearsActive}+ years
                  </span>
                </div>

                <Link 
                  to={`/dashboard/medicines/store/${store.id}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Visit Store
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium Benefits Section */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaCrown className="text-yellow-500" /> Why Choose Premium Pharmacies?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">24/7 Availability</h4>
            <p className="text-sm text-gray-600">Round-the-clock service with emergency support</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Expert Pharmacists</h4>
            <p className="text-sm text-gray-600">Certified professionals for medication guidance</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Temperature Control</h4>
            <p className="text-sm text-gray-600">Advanced storage for sensitive medications</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Fast Delivery</h4>
            <p className="text-sm text-gray-600">1-hour delivery guarantee in metro cities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMedicineStoresPage;