import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { addDoctor } from '../../services/api';
import {toast} from "react-toastify";
const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '',
    specialization: '',
    degree: [],
    available: true,
    consultationFee: 0,
    experience: 1,
    about: '',
    address: { line1: '' },
    pincode: '',
    date: new Date().toISOString().split('T')[0],
    slot_booked: {},
    phone: '',
    hospitalId: '',
    currentPatients: [],
    pastPatients: [],
    languagesSpoken: 'English',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        profileImage: imageUrl,
        file: file,
      }));
    }
  };

  const handleDegreeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      degree: e.target.value.split(',').map((degree) => degree.trim()), // Store as an array
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addDoctor(formData);
    toast.success("Doctor added successfully");
    console.log(formData);
  };

  return (
    <div className="h-full-screen w-full bg-blue-50">
      <form onSubmit={handleSubmit} className="m-5 w-full">
        <p className="font-semibold text-[25px] p-5 ml-2">Add Doctor</p>
        <div className="bg-white mx-8 px-5">
          
          {/* Upload Doctor Image */}
          <div className="flex pt-6 pb-6">
            <label htmlFor="doc-img" className="cursor-pointer">
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Doctor"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaCloudUploadAlt className="text-4xl text-gray-500" />
                )}
              </div>
            </label>
            <input
              type="file"
              id="doc-img"
              name="profileImage"
              onChange={handleFileChange}
              hidden
            />
            <p className="mx-3 flex items-center text-gray-600">Upload Doctor <br /> Picture</p>
          </div>

          {/* Doctor Details */}
          <div className="flex flex-col lg:flex-row items-center gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Your Name</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Doctor Email</p>
                <input
                  className="border rounded px-3 py-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Set Password</p>
                <input
                  className="border rounded px-3 py-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Experience</p>
                <select
                  className="border rounded px-3 py-2"
                  name="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: parseInt(e.target.value, 10) })
                  }
                  required
                >
                  <option value="1">1-5 Years</option>
                  <option value="6">6-10 Years</option>
                  <option value="11">11-15 Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <p>Fees</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  name="consultationFee"
                  placeholder="Doctor Fees"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>Speciality</p>
                <select
                  className="border rounded px-3 py-2"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Speciality</option>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <p>Degree</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="degree"
                  placeholder="Enter degrees (comma-separated)"
                  value={formData.degree.join(', ')}
                  onChange={handleDegreeChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Address</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="line1"
                  placeholder="Enter address"
                  value={formData.address.line1}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Pincode</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
