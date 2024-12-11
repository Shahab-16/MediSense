import React from 'react'
import { images } from '../../assets/asset'
export default function AboutHeader() {
  return (
    <div>
        <div className='flex justify-center mt-[5%] text-[30px] font-semibold'>ABOUT US</div>
        <div className='my-10 flex flex-col md:flex-row gap-12 justify-center'>
          <img className='w-full md:max-w-[360px]' src={images.about_image}/>
          <div className='flex flex-col gap-6 md:w-2/4 text-sm text-gray'>
            <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs 
               and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here 
              to support you every step of the way.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you 
              to access the care you need, when you need it.</p>
          </div>
        </div>
          <div className='text-xl my-4 ml-[12%]'>
              <p>WHY
                <span className='text-gray-700 font-semibold'> CHOOSE US</span>
              </p>
          </div>
          <div className='flex flex col md:flex-row mb-20 justify-center'>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-[26%]'>
              <b>EFFICIENCY:</b>
              <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-[26%]'>
              <b>CONVINIENCE:</b>
              <p>Access to a network of trusted healthcare professionals in your area.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-[26%]'>
              <b>PERSONALIZATION:</b>
              <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
          </div>
    </div>
  )
}
