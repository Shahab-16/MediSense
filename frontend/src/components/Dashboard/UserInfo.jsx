
import React, { useState } from 'react';

const UserInfo = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName:'',
    age: '',
    gender: '',
    contact: '',
    address: '',
    medicalHistory: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('User Information Submitted Successfully!');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">User Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="FirstName" 
          placeholder="First Name" 
          value={formData.FirstName} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
          required
        />
          <input 
          type="text" 
          name="LastName" 
          placeholder="Last Name" 
          value={formData.LastName} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
          required
        />
        
        <input 
          type="number" 
          name="age" 
          placeholder="Age" 
          value={formData.age} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
          required
        />
        
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <input 
          type="text" 
          name="contact" 
          placeholder="Contact Number" 
          value={formData.contact} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
          required
        />
        
        <textarea 
          name="address" 
          placeholder="Address" 
          value={formData.address} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
          required
        ></textarea>
        
        <textarea 
          name="medicalHistory" 
          placeholder="Medical History (if any)" 
          value={formData.medicalHistory} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        
        <button 
          type="submit" 
          className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserInfo;