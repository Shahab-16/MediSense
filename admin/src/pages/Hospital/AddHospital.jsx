import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"; // Importing a React icon for upload

const AddHospital = () => {
  const [formData, setFormData] = useState({
    hospitalId: "",
    name: "",
    address: "",
    contact: "",
    email: "",
    hospitalImage: "",
    doctors: [],
    facilities: [],
    emergencyFacility: false,
    emergencyContact: "911-222-3333",
    ambulance: 0,
    beds: 0,
    icuBeds: 0,
    establishedYear: null,
    deparments: [],
    type: "",
    status: "open",
    aboutHospital: "",
    acheivements: [],
    advancedFacilities: [],
    visitingHours: "9:00 AM - 8:00 PM",
    maxConsultancyTime: 30,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log(formData);
  };

  return (
    <div className="h-full-screen w-full bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="m-5 w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"
      >
        <p className="font-bold text-3xl text-center text-blue-800 mb-6">
          Add Hospital
        </p>
        <div className="bg-white p-5 rounded-xl shadow-md">
          {/* Upload Hospital Image */}
          <div className="flex items-center gap-6 mb-6">
            <label htmlFor="hospital-img" className="cursor-pointer">
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300">
                <FaCloudUploadAlt className="text-4xl text-gray-500" />
              </div>
            </label>
            <input
              type="file"
              id="hospital-img"
              name="hospitalImage"
              onChange={handleChange}
              hidden
            />
            <p className="text-gray-700">
              Upload Hospital <br /> Picture
            </p>
          </div>

          {/* Hospital Details */}
          <div className="flex flex-col lg:flex-row gap-8 text-gray-700">
            <div className="w-full flex flex-col gap-4">
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="name"
                placeholder="Hospital Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="number"
                name="establishedYear"
                placeholder="Established Year"
                value={formData.establishedYear}
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <select
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Hospital Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Charitable">Charitable</option>
              </select>
              <select
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="number"
                name="beds"
                placeholder="Number of Beds"
                value={formData.beds}
                onChange={handleChange}
                min={1}
                required
              />
            </div>
          </div>

          {/* About Hospital */}
          <div className="mt-6">
            <p className="font-semibold mb-2">About Hospital</p>
            <textarea
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              rows="4"
              name="aboutHospital"
              placeholder="Write about the hospital"
              value={formData.aboutHospital}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Disclaimer for Hospital */}
          <div className="mt-4 text-sm text-gray-500 italic">
            <p>
              **Note: Some fields like <strong>Emergency Facility</strong>,{" "}
              <strong>Visiting Hours</strong>, and <strong>ICU Beds</strong> are
              set to default values. You can update them after registration in
              MEDISENSE.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-full mt-8 shadow-lg transition duration-300"
          >
            Add Hospital
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHospital;
