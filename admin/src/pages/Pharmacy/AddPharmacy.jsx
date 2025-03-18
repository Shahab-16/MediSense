import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addPharmacy } from "../../services/api";
import { toast } from "react-toastify";

const AddPharmacy = () => {
  const [formData, setFormData] = useState({
    storeId: "",
    name: "",
    ownerName: "",
    LicenseNumber: "",
    pharmacyImage: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    medicines: [],
    deliveryAvailable: false,
    establishedYear: null,
    status: "open",
    aboutPharmacy: "",
    acheivements: [],
    openHour: "9:00 AM - 10:00 PM",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData({
        ...formData,
        pharmacyImage: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      await addPharmacy(formData);
      toast.success("Pharmacy Added Successfully");
      console.log(formData);
    } catch (error) {
      console.log("Error in adding pharmacy", error);
      toast.error("Failed to add pharmacy");
    }
  };

  return (
    <div className="h-full-screen w-full bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="m-5 w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8"
      >
        <p className="font-bold text-3xl text-center text-blue-800 mb-6">
          Add Pharmacy
        </p>
        <div className="bg-white p-2 rounded-xl shadow-md">
          {/* Upload Pharmacy Image */}
          <div className="flex items-center gap-6 mb-6">
            <label htmlFor="pharmacy-img" className="cursor-pointer">
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FaCloudUploadAlt className="text-4xl text-gray-500" />
                )}
              </div>
            </label>
            <input
              type="file"
              id="pharmacy-img"
              name="pharmacyImage"
              onChange={handleFileChange}
              hidden
            />
            <p className="text-gray-700">
              Upload Pharmacy <br /> Picture
            </p>
          </div>

          {/* Pharmacy Details */}
          <div className="flex flex-col lg:flex-row gap-8 text-gray-700">
            <div className="w-full flex flex-col gap-4">
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="name"
                placeholder="Pharmacy Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="LicenseNumber"
                placeholder="License Number"
                value={formData.LicenseNumber}
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full flex flex-col gap-4">
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
            </div>
          </div>

          {/* About Pharmacy */}
          <div className="mt-6">
            <p className="font-semibold mb-2">About Pharmacy</p>
            <textarea
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              rows="4"
              name="aboutPharmacy"
              placeholder="Write about the pharmacy"
              value={formData.aboutPharmacy}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Disclaimer for MedicalStore */}
          <div className="mt-4 text-sm text-gray-500 italic">
            <p>
              **Note: Some fields like <strong>Delivery Availability</strong>,{" "}
              <strong>Open Hours</strong>, and <strong>Status</strong> are set
              to default values. You can update them after registration in
              MEDISENSE.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-full mt-8 shadow-lg transition duration-300"
          >
            Add Pharmacy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPharmacy;