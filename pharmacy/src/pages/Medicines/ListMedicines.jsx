import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { listAllMedicine, removeMedicine } from "../../services/api";

const ListMedicines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { pharmacyName } = useParams();

  // Fetch medicines from the backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await listAllMedicine(pharmacyName);
        console.log("Full API Response:", response); // Log the entire response

        if (response.medicines && Array.isArray(response.medicines)) {
          setMedicines(response.medicines); // Directly set the medicines array to state
        } else {
          setError("Invalid data format received from the API");
        }
      } catch (err) {
        setError("Failed to fetch medicines"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchMedicines();
  }, [pharmacyName]);

  // Function to handle removing a medicine
  const handleRemove = async (medicineId) => {
    try {
      await removeMedicine(pharmacyName, medicineId); // Pass pharmacyName and medicineId
      setMedicines((prevMedicines) =>
        prevMedicines.filter((medicine) => medicine._id !== medicineId)
      ); // Update the state
      alert("Medicine removed successfully");
    } catch (err) {
      console.error("Error removing medicine:", err);
    }
  };

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading message
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  // Show error message
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
      {/* Button to Add Medicine */}
      <span className="flex justify-center">
        <button
          onClick={() => navigate(`/pharmacy/${pharmacyName}/add-medicine`)}
          className="text-white bg-blue-800 p-2 rounded-md"
        >
          Add Medicine +
        </button>
      </span>

      {/* Search Box with Icon */}
      <span className="flex justify-center">
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" size={20} />
          <input
            className="p-2 pl-10 w-full rounded-lg border shadow-sm"
            placeholder="Search Medicines"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </span>

      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-6 text-lg font-semibold border-b pb-4">
        <p className="text-center">Image</p>
        <p className="text-left">Medicine Name</p>
        <p className="text-left">Category</p>
        <p className="text-right">Price</p>
        <p className="text-left">Composition</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Filtered Medicines List */}
      <div className="flex flex-col gap-6">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <div
              key={medicine._id} // Use _id from the backend
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="text-center">
                <img
                  src={medicine.medicineImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} // Use medicine image from backend or fallback
                  alt={medicine.name}
                  className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-md object-cover mx-auto"
                />
              </div>

              {/* Medicine Name */}
              <p className="text-left font-medium text-gray-800">
                {medicine.name}
              </p>

              {/* Category */}
              <p className="hidden sm:block text-left text-gray-600">
                {medicine.category.join(", ")} {/* Display categories as a comma-separated string */}
              </p>

              {/* Price */}
              <p className="text-right font-semibold text-gray-800">
                ₹{medicine.price}
              </p>

              {/* Composition */}
              <p className="hidden sm:block text-left text-gray-600">
                {medicine.composition}
              </p>

              {/* Remove Button */}
              <div className="text-center">
                <button
                  onClick={() => handleRemove(medicine._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No medicines found.</p>
        )}
      </div>
    </div>
  );
};

export default ListMedicines;