import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa'; // Importing a React icon for upload

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '',
    specialization: '',
    degree: [],
    available: true, // Default value
    consultationFee: 0,
    experience: 0,
    about: '',
    address: {
      line1: '',
      line2: '',
    },
    date: new Date().toISOString().split('T')[0], // Default value: current date
    slot_booked: {}, // Default value
    phone: '',
    hospitalId: '',
    currentPatients: [], // Default value
    pastPatients: [], // Default value
    languagesSpoken: 'English', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file.name, // You can handle file upload logic here
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log(formData);
  };

  return (
    <div className='h-full-screen w-full bg-blue-50'>
      <form onSubmit={handleSubmit} className='m-5 w-full'>
        <p className='font-semibold text-[25px] p-5 ml-2'>Add Doctors</p>
        <div className='bg-white mx-8 px-5'>
          {/* Upload Doctor Image */}
          <div className='flex pt-6 pb-6'>
            <label htmlFor='doc-img' className='cursor-pointer'>
              <div className='w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300'>
                <FaCloudUploadAlt className='text-4xl text-gray-500' />
              </div>
            </label>
            <input
              type='file'
              id='doc-img'
              name='profileImage'
              onChange={handleFileChange}
              hidden
            />
            <p className='mx-3 flex items-center text-gray-600'>Upload Doctor <br /> Picture</p>
          </div>

          {/* Doctor Details */}
          <div className='flex flex-col lg:flex-row items-center gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Your Name</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Doctor Email</p>
                <input
                  className='border rounded px-3 py-2'
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Set Password</p>
                <input
                  className='border rounded px-3 py-2'
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Experience</p>
                <select
                  className='border rounded px-3 py-2'
                  name='experience'
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value='1'>1-5 Years</option>
                  <option value='6'>6-10 Years</option>
                  <option value='11'>11-15 Years</option>
                  <option value='15'>15+ Years</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Fees</p>
                <input
                  className='border rounded px-3 py-2'
                  type='number'
                  name='consultationFee'
                  placeholder='Doctor Fees'
                  value={formData.consultationFee}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Speciality</p>
                <select
                  className='border rounded px-3 py-2'
                  name='specialization'
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value=''>Select Speciality</option>
                  <option value='General physician'>General physician</option>
                  <option value='Gynecologist'>Gynecologist</option>
                  <option value='Dermatologist'>Dermatologist</option>
                  <option value='Pediatricians'>Pediatricians</option>
                  <option value='Neurologist'>Neurologist</option>
                  <option value='Gastroenterologist'>Gastroenterologist</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Degree</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='degree'
                  placeholder='Degree'
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Address</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='line1'
                  placeholder='Address Line 1'
                  value={formData.address.line1}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='line2'
                  placeholder='Address Line 2'
                  value={formData.address.line2}
                  onChange={handleAddressChange}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Phone</p>
                <input
                  className='border rounded px-3 py-2'
                  type='tel'
                  name='phone'
                  placeholder='Phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div className='mt-6'>
            <p>About Doctor</p>
            <textarea
              className='w-full px-4 pt-2 border rounded'
              rows='5'
              name='about'
              placeholder='Write about doctor'
              value={formData.about}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Disclaimer */}
          <div className='mt-4 text-sm text-gray-500 italic'>
            <p>
              **Note: Some fields like <strong>Availability</strong>, <strong>Languages Spoken</strong>, and <strong>Slot Bookings</strong> are set to default values. You can update them after registration in MEDISENSE.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-blue-600 px-10 py-3 mt-8 text-white rounded-full'
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;