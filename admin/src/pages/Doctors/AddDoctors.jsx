import React from 'react'
import { assets } from '../../assets/admin_assets/assets'

const AddHospital = () => {
  return (
    <div className='h-full-screen w-full bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center overflow-hidden'>
      <form className='m-5 w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8'>
        <p className='font-bold text-3xl text-center text-blue-800 mb-6'>Add Hospital</p>
        <div className='bg-white p-5 rounded-xl shadow-md'>
          {/* Upload Hospital Image */}
          <div className='flex items-center gap-6 mb-6'>
            <label htmlFor='hospital-img' className='cursor-pointer'>
              <img className='w-28 h-28 rounded-full object-cover shadow-lg hover:shadow-xl transition duration-300' src={assets.profile_image} alt='Upload Hospital' />
            </label>
            <input type='file' id='hospital-img' hidden />
            <p className='text-gray-700'>Upload Hospital <br /> Picture</p>
          </div>

          {/* Hospital Details */}
          <div className='flex flex-col lg:flex-row gap-8 text-gray-700'>
            <div className='w-full flex flex-col gap-4'>
              <input className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300' type='text' placeholder='Hospital Name' />
              <input className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300' type='email' placeholder='Email' />
              <input className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300' type='tel' placeholder='Contact Number' />
              <input className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300' type='number' placeholder='Established Year' />
            </div>

            <div className='w-full flex flex-col gap-4'>
              <select className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300'>
                <option value=''>Select Hospital Type</option>
                <option value='Government'>Government</option>
                <option value='Private'>Private</option>
                <option value='Charitable'>Charitable</option>
              </select>
              <select className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300'>
                <option value=''>Status</option>
                <option value='Open'>Open</option>
                <option value='Closed'>Closed</option>
              </select>
              <input className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300' type='text' placeholder='Address Line 1' />
              <input className='border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300' type='text' placeholder='Address Line 2' />
            </div>
          </div>

          {/* About Hospital */}
          <div className='mt-6'>
            <p className='font-semibold mb-2'>About Hospital</p>
            <textarea className='w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300' rows='4' placeholder='Write about the hospital'></textarea>
          </div>

          {/* Submit Button */}
          <button type='submit' className='w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-full mt-8 shadow-lg transition duration-300'>
            Add Hospital
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddHospital;
