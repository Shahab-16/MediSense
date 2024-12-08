import React from 'react'
import { images } from '../../assets/asset'
export default function Speciality() {
    return (
        <div className='flex flex-col items-center justify-center text-center gap-4'>
            <div className='text-[50px] font-medium'>
                <h1>Find By Speciality</h1>
            </div>
            <div className='w-[55%]'>
                <p>Simply browse through our extensive list of trusted doctors, each with a proven track record of excellence in their field, and schedule your appointment hassle-free at your convenience</p>
            </div>
            {/* find by specn */}
            <div className='flex gap-4 mt-[6%]'>
                <div className='flex flex-col gap-2'>
                    <img src={images.Gastroenterologist} alt='' />
                    <p>Gastroenterologist</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src={images.Pediatricians} alt='' />
                    <p>Gastroenterologist</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src={images.General_physician} alt='' />
                    <p>Gastroenterologist</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src={images.Gynecologist} alt='' />
                    <p>Gastroenterologist</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src={images.Neurologist} alt='' />
                    <p>Gastroenterologist</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src={images.Dermatologist} alt='' />
                    <p>Gastroenterologist</p>
                </div>
            </div>
            <div className='mt-[5%]'>
                    <div className='text-[35px] font-bold'>Top Doctors To Book</div>
                    <p>Simply browse through our extensive list of trusted doctors.</p>
            </div>
        </div>
    )
}
