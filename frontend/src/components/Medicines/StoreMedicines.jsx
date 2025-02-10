import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaTrash, FaPlusCircle, FaMinusCircle, FaFilter, FaSearch, FaPills, FaCapsules, FaSyringe, FaHeartbeat } from 'react-icons/fa';
import { GiMedicinePills } from 'react-icons/gi';

// Hospital names from AllMedicineStoresPage
const hospitalNames = [
  "Elite Meds Mumbai", 
  "Delhi Care Pharmacy", 
  "City Meds Bangalore",
  "Chennai Pharma Hub", 
  "Hyderabad Health Plus", 
  "Pune Wellness Center",
  "Kolkata Medico", 
  "Ahmedabad Pharma"
];

// Enhanced medicine data
const brands = ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Abbott', 'GlaxoSmithKline'];
const diseases = ['Diabetes', 'Hypertension', 'Arthritis', 'Asthma', 'Migraine', 'Thyroid'];
const categories = ['Tablets', 'Capsules', 'Syrups', 'Injections', 'Ointments', 'Drops'];

const medicines = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  name: `MediCare ${['Plus', 'Pro', 'Active', 'Guard', 'Relief', 'Care'][i % 6]} ${i + 1}`,
  price: Math.floor(Math.random() * (2000 - 100 + 1) + 100),
  image: `https://source.unsplash.com/600x400/?medicine,medication${i}`,
  hospital: hospitalNames[i % hospitalNames.length],
  category: categories[i % categories.length],
  brand: brands[i % brands.length],
  disease: diseases[i % diseases.length],
  description: `Effective treatment for ${diseases[i % diseases.length]}, ${['fast-acting', 'long-lasting', 'proven results', 'doctor recommended'][i % 4]}`,
  dosage: `${['Once daily', 'Twice daily', 'With meals', 'Before sleep'][i % 4]} | ${['10mg', '20mg', '50mg', '100mg'][i % 4]}`
}));

const StoreMedicinesList = () => {
  const { storeId } = useParams();
  const [selectedDisease, setSelectedDisease] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState({});
  const itemsPerPage = 12;

  // Filter and sort logic
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDisease = selectedDisease === 'All' || medicine.disease === selectedDisease;
    const matchesBrand = selectedBrand === 'All' || medicine.brand === selectedBrand;
    return matchesSearch && matchesDisease && matchesBrand;
  });

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  // Pagination
  const totalPages = Math.ceil(sortedMedicines.length / itemsPerPage);
  const currentMedicines = sortedMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cart handling
  const handleCartAction = (id, action) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (action === 'add') newCart[id] = 1;
      if (action === 'increment') newCart[id]++;
      if (action === 'decrement') newCart[id] > 1 ? newCart[id]-- : delete newCart[id];
      return newCart;
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-[1800px] mt-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <GiMedicinePills className="text-6xl mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold mb-4">Welcome to {hospitalNames[storeId % hospitalNames.length]}</h1>
          <p className="text-xl mb-6">Your Trusted Partner in Health & Wellness</p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="block text-2xl font-bold">24/7</span>
              <span>Support</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="block text-2xl font-bold">100%</span>
              <span>Authentic</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="block text-2xl font-bold">1Hr</span>
              <span>Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-full sm:w-64">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="bg-transparent outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <FaFilter className="text-blue-600" />
            <select 
              className="bg-transparent outline-none"
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              <option value="All">All Diseases</option>
              {[...new Set(medicines.map(m => m.disease))].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <FaFilter className="text-blue-600" />
            <select 
              className="bg-transparent outline-none"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="All">All Brands</option>
              {[...new Set(medicines.map(m => m.brand))].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <FaFilter className="text-blue-600" />
            <select
              className="bg-transparent outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Quick Disease Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {['All', ...new Set(medicines.map(m => m.disease))].map(disease => (
            <button
              key={disease}
              onClick={() => setSelectedDisease(disease)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedDisease === disease
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {disease}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentMedicines.map(medicine => (
          <div key={medicine.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-[420px]">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
              <img 
                src="http://worldfertilityservices.com/wp-content/uploads/2016/04/meddici.jpg"
                alt={medicine.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  {medicine.category === 'Tablets' ? <FaPills /> :
                   medicine.category === 'Capsules' ? <FaCapsules /> :
                   medicine.category === 'Injections' ? <FaSyringe /> : <FaHeartbeat />}
                  {medicine.category}
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                  {medicine.hospital}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{medicine.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-blue-600">{medicine.brand}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{medicine.dosage}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{medicine.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-blue-600">₹{medicine.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {medicine.disease}
                  </span>
                </div>

                {cart[medicine.id] ? (
                  <div className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-lg">
                    <button 
                      onClick={() => handleCartAction(medicine.id, 'decrement')}
                      className="text-red-600 hover:text-red-700 text-lg"
                    >
                      {cart[medicine.id] === 1 ? <FaTrash /> : <FaMinusCircle />}
                    </button>
                    <span className="font-medium">{cart[medicine.id]}</span>
                    <button 
                      onClick={() => handleCartAction(medicine.id, 'increment')}
                      className="text-green-600 hover:text-green-700 text-lg"
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleCartAction(medicine.id, 'add')}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCartPlus className="text-lg" /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          Previous
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoreMedicinesList;