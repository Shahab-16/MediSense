import React, { useState } from "react";
import { medicines } from "../../assets/admin_assets/assets";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { assets } from "../../assets/admin_assets/assets";
import { pharmacyList } from "../../assets/admin_assets/assets";
import { useNavigate } from "react-router";
const ListAllPharmacy = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPharmacy = pharmacyList.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-8 p-4 sm:p-8">
      {/* button to add pharmacy */}
      <div className="flex justify-around">
        <span>
          <button onClick={() => navigate("/admin/medicines/add-medicines")} className="bg-blue-800 text-white p-2 rounded-md">Add Pharmacy +</button>
        </span>
        {/* <span> */}
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" size={20} />
          <input
            className="p-2 pl-10 w-full rounded-lg border shadow-sm"
            placeholder="Search pharmacy"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* </span> */}
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
        {filteredPharmacy.length > 0 ?
          (filteredPharmacy.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center text-sm sm:text-base bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="text-center">
                <img
                  src={assets.medical_store}
                  alt={pharmacy.name}
                  className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-md object-cover mx-auto"
                />
              </div>

              {/* pharmacy Name */}
              <p className="text-left font-medium text-gray-800">{pharmacy.name}</p>

              {/* location */}
              <p className="hidden sm:block text-left text-gray-600">
                {pharmacy.location}
              </p>
              <p className={`text-center font-semibold ${pharmacy.open ? "text-green" : "text-red"
                } `}>
                {pharmacy.open ? "Open" : "Close"}
              </p>
              {/* Remove Button */}
              <div className="text-center">
                <button
                  className="text-red-600 hover:text-red-800 transition-colors duration-300"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </div>
          ))):(<p>Pharmacy not found</p>
          )}
      </div>
    </div>
  );
};

export default ListAllPharmacy;
