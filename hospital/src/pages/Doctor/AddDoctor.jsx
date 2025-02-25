import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
const AddDoctor = () => {
  return (
    <div className=' h-full-screen w-full bg-blue-50'>
      <form className='m-5 w-full'>
        <p className='font-semibold text-[25px] p-5 ml-2'>Add Doctors</p>
        <div className='bg-white mx-8 px-5'>
          <div className='flex pt-6 pb-6'>
            <label for="doc-img">
              <img className='cursor-pointer' src={assets.profile_image}></img>
            </label>
            <input type="file" name="" id="doc-img" hidden></input>
            <p className='mx-3 flex items-center text-gray-600'>Upload Doctor <br /> Picture</p>
          </div>
          <div className='flex flex-col lg:flex-row items-center gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4 bordee'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Your Name</p>
                <input className='border rounded px-3 py-2' type="text" placeholder="Name"></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Doctor Email</p>
                <input className='border rounded px-3 py-2' type="text" placeholder="Email"></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Set Password</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='Password'></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Experience</p>
                <select className='border rounded px-3 py-2'>
                  <option value="1 Year">1-5 Years</option>
                  <option value="2 Years">6-10 Years</option>
                  <option value="3 Years">11-15 Years</option>
                  <option value=" 4 Years">15+ Years</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Fees</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='Doctor Fees'></input>
              </div>
            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Speciality</p>
                <select className='border rounded px-3 py-2'>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Degree</p>
                <input className='border rounded px-3 py-2' type="text" placeholder="Degree"></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Address</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='Address 1'></input>
                <input className='border rounded px-3 py-2' type='text' placeholder='Address 2'></input>
              </div>
            </div>
            {/* about doctors */}
          </div>
          <div>
            <p>About Doctors</p>
            <textarea className='w-full px-4 pt-2 border rounded' rows="5" placeholder='write about doctor'></textarea>
          </div>
          <button type='submit' className='bg-blue-600 px-10 py-3 mt-8 text-white rounded-full'>Add Doctor</button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
