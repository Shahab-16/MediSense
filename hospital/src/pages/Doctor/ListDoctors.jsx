import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { listAllDoctors, removeDoctor } from "../../services/api";

const ListDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { hospitalName } = useParams();

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await listAllDoctors(hospitalName); // Call the API to fetch doctors
        if (response.success && Array.isArray(response.doctors)) {
          setDoctors(response.doctors); // Set the fetched data to state
        } else {
          setError("Invalid data format received from the API");
        }
      } catch (err) {
        setError("Failed to fetch doctors"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchDoctors();
  }, [hospitalName]);

  // Function to handle removing a doctor
  const handleRemove = async (doctorId) => {
    try {
      await removeDoctor(hospitalName, doctorId); // Pass hospitalName and doctorId
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== doctorId)
      ); // Update the state
      alert("Doctor removed successfully");
    } catch (err) {
      console.error("Error removing doctor:", err);
    }
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Button to Add Doctor */}
      <span className="flex justify-center">
        <button
          onClick={() => navigate(`/hospital/${hospitalName}/doctors/add-doctor`)}
          className="text-white bg-blue-800 p-2 rounded-md"
        >
          Add Doctor +
        </button>
      </span>

      {/* Search Box with Icon */}
      <span className="flex justify-center">
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" size={20} />
          <input
            className="p-2 pl-10 w-full rounded-lg border shadow-sm"
            placeholder="Search Doctors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </span>

      {/* Header */}
      <div className="hidden ml-[3.2%] sm:grid sm:grid-cols-6 gap-6 text-lg font-semibold border-b pb-4">
        <p className="text-center">Image</p>
        <p className="text-left">Name</p>
        <p className="text-left">Specialization</p>
        <p className="text-left">Experience</p>
        <p className="text-center">Availability</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Filtered Doctors List */}
      <div className="flex flex-col gap-6 text-lg border-b pb-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id} // Use _id from the backend
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="text-center ml-[25%]">
                <img
                  src={doctor.profileImage} // Use doctor image from backend or fallback
                  alt={doctor.name}
                  className="w-[60px] h-[60px] rounded-md object-cover mx-auto"
                />
              </div>

              {/* Name */}
              <p className="text-left font-medium text-gray-800">
                {doctor.name}
              </p>

              {/* Specialization */}
              <p className="hidden sm:block text-left text-gray-600">
                {doctor.specialization}
              </p>

              {/* Experience */}
              <p className="hidden sm:block text-left text-gray-800">
                {doctor.experience} years
              </p>

              {/* Availability */}
              <p
                className={`text-center font-medium ${
                  doctor.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {doctor.available ? "Available" : "Not Available"}
              </p>

              {/* Remove Button */}
              <div className="text-center">
                <button
                  onClick={() => handleRemove(doctor._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default ListDoctors;