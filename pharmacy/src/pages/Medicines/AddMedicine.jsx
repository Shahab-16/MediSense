import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { addMedicine } from '../../services/api';
import { useParams } from 'react-router-dom';

const AddMedicine = () => {
  const pharmacyNameObject = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    manufacturerBrand: '',
    description: '',
    prescriptionRequired: false,
    stock: 0,
    medicineImage: '',
    category: [],
    expiryDate: '',
    dosageForm: '',
    strength: '',
    sideEffects: [],
    discount: 0,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Update image preview
      setFormData({
        ...formData,
        medicineImage: file, // Store file in state (for API submission)
      });
    }
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value.split(',').map((item) => item.trim()), // Convert to array
    });
  };

  const handleSideEffectsChange = (e) => {
    setFormData({
      ...formData,
      sideEffects: e.target.value.split(',').map((item) => item.trim()), // Convert to array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("Printing Pharmacy name in add medicine:", pharmacyNameObject.pharmacyName);
      const response = await addMedicine(pharmacyNameObject.pharmacyName, formData);
      console.log("Medicine added successfully:", response);
      setSuccessMessage("Medicine added successfully!");
      setErrorMessage(''); // Clear any previous error message
    } catch (err) {
      console.error("Error in adding medicine:", err);
      setErrorMessage("Error in adding medicine. Please try again.");
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  return (
    <div className='h-full-screen w-full bg-blue-50'>
      <form onSubmit={handleSubmit} className='m-5 w-full'>
        <p className='font-semibold text-[25px] p-5 ml-2'>Add Medicine</p>
        {successMessage && <div className="text-green-500 p-5 ml-2">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 p-5 ml-2">{errorMessage}</div>}
        <div className='bg-white mx-8 px-5'>
          {/* Upload Medicine Image */}
          <div className='flex pt-6 pb-6'>
            <label htmlFor='med-img' className='cursor-pointer'>
              <div className='w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300 overflow-hidden'>
                {imagePreview ? (
                  <img src={imagePreview} alt='Uploaded' className='w-full h-full object-cover' />
                ) : (
                  <FaCloudUploadAlt className='text-4xl text-gray-500' />
                )}
              </div>
            </label>
            <input
              type='file'
              id='med-img'
              name='medicineImage'
              accept='image/*'
              onChange={handleFileChange}
              hidden
            />
            <p className='mx-3 flex items-center text-gray-600'>Upload Medicine <br /> Picture</p>
          </div>

          {/* Medicine Details */}
          <div className='flex flex-col lg:flex-row items-center gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Medicine Name</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='name'
                  placeholder='Medicine Name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Price in Rs.</p>
                <input
                  className='border rounded px-3 py-2'
                  type='number'
                  name='price'
                  min={0}
                  placeholder='Price in Rs.'
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Manufacturer Brand</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='manufacturerBrand'
                  placeholder='Manufacturer Brand'
                  value={formData.manufacturerBrand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Description</p>
                <textarea
                  className='border rounded px-3 py-2'
                  rows='3'
                  name='description'
                  placeholder='Description'
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <p>Category (Comma Separated)</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='category'
                  placeholder='Category'
                  value={formData.category.join(', ')}
                  onChange={handleCategoryChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Expiry Date</p>
                <input
                  className='border rounded px-3 py-2'
                  type='date'
                  name='expiryDate'
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Dosage Form</p>
                <select
                  className='border rounded px-3 py-2'
                  name='dosageForm'
                  value={formData.dosageForm}
                  onChange={handleChange}
                  required
                >
                  <option value=''>Select Dosage Form</option>
                  <option value='Tablet'>Tablet</option>
                  <option value='Capsule'>Capsule</option>
                  <option value='Syrup'>Syrup</option>
                  <option value='Injection'>Injection</option>
                  <option value='Ointment'>Ointment</option>
                  <option value='Drops'>Drops</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Strength</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='strength'
                  placeholder='Strength'
                  value={formData.strength}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Side Effects (Comma Separated)</p>
                <input
                  className='border rounded px-3 py-2'
                  type='text'
                  name='sideEffects'
                  placeholder='Side Effects'
                  value={formData.sideEffects.join(', ')}
                  onChange={handleSideEffectsChange}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Discount (%)</p>
                <input
                  className='border rounded px-3 py-2'
                  type='number'
                  name='discount'
                  min={0}
                  placeholder='Discount in percentage'
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-5 flex justify-center'>
            <button type='submit' className='bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;