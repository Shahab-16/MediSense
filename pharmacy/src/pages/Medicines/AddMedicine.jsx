import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
const AddMedicine = () => {
  return (
    <div className=' h-full-screen w-full bg-blue-50'>
      <form className='m-5'>
        <p className='font-semibold text-[25px] p-5 ml-2'>Add Medicines</p>
        <div className='bg-white mx-8 px-5'>
          <div className='flex pt-6 pb-6'>
            <label for="doc-img">
              <img className='cursor-pointer' src={assets.profile_image}></img>
            </label>
            <input type="file" name="" id="doc-img" hidden></input>
            <p className='mx-3 flex items-center text-gray-600'>Upload Medicine <br /> Picture</p>
          </div>
          <div className='flex flex-col lg:flex-row items-center gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4 bordee'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Medicine Name</p>
                <input className='border rounded px-3 py-2' type="text" placeholder="Medicine Name"></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Category</p>
                <input className='border rounded px-3 py-2' type="text" placeholder="Category"></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Price</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='Price'></input>
              </div>
              <div className='flex flex-col gap-1'>
                <p>Composition</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='composition'></input>
              </div>
            </div>
          </div>
            <div>
              <p>Description</p>
              <textarea className='w-full px-4 pt-2 border rounded' rows="5" placeholder='write about medicine'></textarea>
            </div>
            <button type='submit' className='bg-blue-600 px-10 py-3 mt-8 text-white rounded-full'>Add Medicine</button>
        </div>
      </form>
    </div>
  )
}

export default AddMedicine
