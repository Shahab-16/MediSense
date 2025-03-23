import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addDoctor } from "../../services/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddDoctor = () => {
  const { hospitalName } = useParams(); // Extract hospitalName from URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImage: "",
    specialization: "",
    degree: [],
    available: true,
    fees: 0,
    about: "",
    address: { line1: "" },
    pincode: "",
    slot_booked: {},
    currentPatients: [],
    pastPatients: [],
    languagesSpoken: "English",
  });

  const [file, setFile] = useState(null);

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
      }));
      setFile(file);
    }
  };

  const handleDegreeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      degree: e.target.value.split(",").map((degree) => degree.trim()), // Store as an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email); // Append email only once
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("specialization", formData.specialization);
      formDataToSend.append("degree", JSON.stringify(formData.degree)); // Ensure this is a valid JSON string
      formDataToSend.append("fees", formData.fees);
      formDataToSend.append("address", JSON.stringify(formData.address)); // Ensure this is a valid JSON string
      formDataToSend.append("languagesSpoken", formData.languagesSpoken);
      formDataToSend.append("profileImage", file); // Append the file
  
      await addDoctor(hospitalName, formDataToSend);
      toast.success("Doctor added successfully");
    } catch (err) {
      console.log("Error in adding doctor", err);
      toast.error("Failed to add doctor");
    }
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
            <p className="mx-3 flex items-center text-gray-600">
              Upload Doctor <br /> Picture
            </p>
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
                <p>Phone</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
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
                <p>Fees</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  name="fees"
                  placeholder="Doctor Fees"
                  value={formData.fees}
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
                  value={formData.degree.join(", ")}
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
              <div className="flex flex-col gap-1">
                <p>Languages Spoken</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  name="languagesSpoken"
                  placeholder="Languages Spoken"
                  value={formData.languagesSpoken}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;