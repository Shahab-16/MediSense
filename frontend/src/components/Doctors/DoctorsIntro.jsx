import React from 'react';
import { images } from '../../assets/asset';

export default function DoctorsIntro() {
    return (
        <div>
            <section className="bg-blue-600 flex flex-col lg:flex-row items-center max-w-[1350px] rounded-md justify-between text-white h-auto lg:h-[75vh] mx-auto px-4">
                {/* Left Content */}
                <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left max-w-3xl p-4">
                    <h1 className="text-3xl lg:text-4xl font-bold">
                        Welcome to Doctors Portal
                        <br />
                        Book Appointment With Our Trusted Doctors
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                            className="w-16 sm:w-24"
                            src={images.group_profiles}
                            alt="Group Profiles"
                        />
                        <p className="text-lg">
                            Connecting you with the best doctors to ensure your good health
                        </p>
                    </div>
                    <div>
                        <a
                            href="#appointment"
                            className="bg-white text-blue-600 py-2 px-6 rounded-lg text-lg shadow hover:bg-gray-200 transition duration-300"
                        >
                            Book an Appointment
                        </a>
                    </div>
                </div>
                {/* Right Content */}
                <div className="mt-6 lg:mt-0">
                    <img
                        src={images.appointment_img}
                        alt="Appointment"
                        className="w-full lg:w-[600px] rounded-lg object-cover"
                    />
                </div>
            </section>
        </div>
    );
}
