import React, { useState, useCallback } from "react";
import { useImmer } from "use-immer";
import { FaUserEdit, FaSave, FaPills, FaCheckCircle, FaUserMd, FaCalendarAlt, FaCamera, FaHeartbeat, FaNotesMedical, FaWeight, FaRulerVertical, FaTint, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [userDetails, updateUserDetails] = useImmer({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    age: 30,
    gender: "male",
    bloodGroup: "A+",
    height: 180,
    weight: 75,
    allergies: "None",
    diseases: "None",
    medications: "None",
    address: {
      street: "123 Main St",
      city: "City",
      state: "State",
      zipCode: "12345",
    },
  });

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateUserDetails((draft) => {
        if (name.includes(".")) {
          const [parent, child] = name.split(".");
          draft[parent][child] = value;
        } else {
          draft[name] = value;
        }
      });
    },
    [updateUserDetails]
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{userDetails.firstName} {userDetails.lastName}</h2>
          <p className="text-gray-600">{userDetails.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          "firstName", "lastName", "email", "phoneNumber", "age", "gender", "bloodGroup", "height", "weight", "allergies", "diseases", "medications"
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={userDetails[field]}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isEditing ? "border-gray-300" : "bg-gray-100"}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        {isEditing ? (
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FaSave className="mr-2" /> Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaUserEdit className="mr-2" /> Edit
          </button>
        )}
      </div>
      <div className="mt-8 flex space-x-4">
        <Link to="/dashboard/userinfo/my-ordered-medicines" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <FaPills className="mr-2" /> Ordered Medicines
        </Link>
        <Link to="/dashboard/userinfo/delivered-medicines" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <FaCheckCircle className="mr-2" /> Delivered Medicines
        </Link>
        <Link to="/dashboard/userinfo/consulted-doctors" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <FaUserMd className="mr-2" /> Consulted Doctors
        </Link>
        <Link to="/dashboard/userinfo/my-appointments" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <FaCalendarAlt className="mr-2" /> My Appointments
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
