import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { assets } from "../../assets/admin_assets/assets";
import { useNavigate } from "react-router";
import { listPharmacies, removePharmacy } from "../../services/api";

const ListAllPharmacy = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacyList, setPharmacyList] = useState([]); // State to store pharmacy data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch pharmacy data from the backend
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await listPharmacies(); // Call the API to fetch pharmacies
        setPharmacyList(data); // Set the fetched data to state
        setLoading(false); // Set loading to false
      } catch (err) {
        setError("Failed to fetch pharmacies"); // Handle errors
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  const handleRemovePharmacy = async (id) => {
    try {
      await removePharmacy(id); // Call the API to remove the pharmacy
      setPharmacyList((prevList) => prevList.filter((pharmacy) => pharmacy._id !== id)); // Update the state
      alert("Pharmacy removed successfully");
    } catch (err) {
      console.error("Error removing pharmacy:", err);
    }
  };

  // Filter pharmacies based on search term
  const filteredPharmacy = pharmacyList.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center">Loading...</p>; // Show loading message
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Show error message
  }

  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
      {/* Button to add pharmacy */}
      <div className="flex justify-around">
        <span>
          <button
            onClick={() => navigate("/admin/medicines/add-medicines")}
            className="bg-blue-800 text-white p-2 rounded-md"
          >
            Add Pharmacy +
          </button>
        </span>

        {/* Search bar */}
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" size={20} />
          <input
            className="p-2 pl-10 w-full rounded-lg border shadow-sm"
            placeholder="Search pharmacy"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-6 text-lg font-semibold border-b pb-4">
        <p className="text-center">Image</p>
        <p className="text-left">Pharmacy Name</p>
        <p className="text-left">Location</p>
        <p className="text-center">Open/Close</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Items */}
      <div className="flex flex-col mr-[2%] gap-4 text-lg font-semibold border-b pb-4">
        {filteredPharmacy.length > 0 ? (
          filteredPharmacy.map((pharmacy) => (
            <div
              key={pharmacy._id} // Use _id from the backend
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center text-sm sm:text-base bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="text-center">
                <img
                  src={pharmacy.image || assets.medical_store} // Use pharmacy image from backend or fallback
                  alt={pharmacy.name}
                  className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-md object-cover mx-auto"
                />
              </div>

              {/* Pharmacy Name */}
              <p className="text-left font-medium text-gray-800">{pharmacy.name}</p>

              {/* Location */}
              <p className="hidden sm:block text-left text-gray-600">
                {pharmacy.location}
              </p>

              {/* Open/Close Status */}
              <p className={`text-center font-semibold ${pharmacy.open ? "text-green-500" : "text-red-500"}`}>
                {pharmacy.open ? "Open" : "Closed"}
              </p>

              {/* Remove Button */}
              <div className="text-center">
                <button
                  className="text-red-600 hover:text-red-800 transition-colors duration-300"
                  onClick={() => handleRemovePharmacy(pharmacy._id)} // Add remove functionality
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No pharmacies found</p>
        )}
      </div>
    </div>
  );
};

export default ListAllPharmacy;