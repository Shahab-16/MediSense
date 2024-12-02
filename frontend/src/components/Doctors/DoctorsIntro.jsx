import React from 'react'
import { images } from '../../assets/asset'
export default function DoctorsIntro() {
    return (
        <div>
            <section className="bg-blue-600 flex items-center max-w-[1300px] rounded-md justify-center text-white h-[75vh] mx-auto px-4 ml-[8%] mr-[8%]">
                <div className="flex flex-col items-center gap-5 text-center max-w-3xl">
                    <h1 className="text-4xl font-bold">
                        Welcome to Doctors Portal
                        <br />
                        Book Appointment With out trusted  Doctors
                    </h1>
                    <div className='flex'>
                        <div className='mt-2'>
                            <img className='w-24' src={images.group_profiles} alt=''></img>
                        </div>
                        <div className='ml-2'>
                            <p className="mt-4 text-lg">
                                Connecting you with the best doctors to ensure your health
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 text-black  font-semibold ">
                        <a
                            href="#appointment"
                            className="bg-white text-black-600 py-2 px-6 rounded-lg text-lg shadow hover:bg-gray-200 transition duration-300"
                        >
                            Book an Appointment
                        </a>
                    </div>
                </div>
                <div>
                    <img src={images.appointment_img} alt='' className='h-95 object-cover' />
                </div>
            </section>
        </div>
    )
}
