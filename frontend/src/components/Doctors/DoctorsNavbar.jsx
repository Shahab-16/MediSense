import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function DoctorsNavbar() {
    const navigate = useNavigate()
    return (
        <div>
            {/* Navbar */}
            <nav className="container mx-auto max-w-[1300px] flex justify-between items-center p-4">
                {/* Logo */}
                <div className="text-[30px] font-bold text-blue-800">
                    <a href="/">DocSpace</a>
                </div>
                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 text-xl font-semibold">
                    <li>
                        <a onClick={() => navigate('/dashboard/doctors')} className="hover:text-gray-300">HOME</a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/dashboard/doctors/alldoctors')} className="hover:text-gray-300">ALL DOCTORS</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-300">ABOUT</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-300">CONTACT</a>
                    </li>
                </ul>
                <div>
                    <button className='text-white bg-blue-800 rounded-xl p-2 w-[150px]'>Create Account</button>
                </div>
            </nav>
            <div class="border-b border-gray-300"></div>
        </div>
    )
}
