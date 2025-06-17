import React from 'react'
import { images } from '../../assets/asset'
const ContactUs = () => {
  return (
    <div>
      <div className='flex justify-center'>
      <p  className='text-[2rem] text-center mt-[4%] text-gray-600'>CONTACT</p> 
      <p className='font-semibold text-[2rem] text-center mt-[4%] ml-[1.5%]'>US</p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-md'>
        <img src={images.contact_img} className='w-full md:max-w-[360px]' alt="" />
        <div className='flex flex-col item-start gap-8'>
          <p className='font-semibold text-gray-600 text-lg'>OUR OFFICE</p>
          <p className='text-gray-500'>Rorkela Odissa
          Sector 12, India</p>
          <p className='text-gray-500'>Tel: +1 800-123-4567
          Email:medisense@gmail.com</p>
          <p className='font-semibold text-[25px]'>CAREERS AT MEDISENSE</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          
        </div>
      </div>
    </div>
  )
}

export default ContactUs
