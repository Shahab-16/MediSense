import React from 'react'

export default function DoctorsNavbar() {
    return (
        <div>
            {/* Navbar */}
            <nav className="container mx-auto max-w-[1300px] flex justify-between items-center p-4">
                {/* Logo */}
                <div className="text-[30px] font-bold text-blue-800">
                    <a href="/">DocSpace</a>
                </div>
                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 text-xl">
                    <li>
                        <a href="#home" className="hover:text-gray-300">Home</a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-gray-300">About</a>
                    </li>
                    <li>
                        <a href="#services" className="hover:text-gray-300">Services</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-gray-300">Contact</a>
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
