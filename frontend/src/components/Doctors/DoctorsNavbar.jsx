// import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { images } from '../../assets/asset'
import {React,useState,useRef,useEffect} from 'react';
export default function DoctorsNavbar() {
    const navigate = useNavigate();
    const [isDropdown,setIsDropdown]=useState(false);
    const handleToggle=()=>{
        setIsDropdown(!isDropdown);
    }
    const dropdownref=useRef(null);
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownref.current && !dropdownref.current.contains(event.target)){
                setIsDropdown(false);
            }
        };
            document.addEventListener('mousedown', handleClickOutside); 
            return () => document.removeEventListener('mousedown', handleClickOutside);
    },[]);
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
                        <Link to='/dashboard/doctors' className="hover:text-gray-300 cursor-pointer">HOME</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/doctors/alldoctors' className="hover:text-gray-300 cursor-pointer">ALL DOCTORS</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/doctors/about' className="hover:text-gray-300 cursor-pointer">ABOUT</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/doctors/contactUs' className="hover:text-gray-300 cursor-pointer">Contact</Link>
                    </li>
                </ul>
                <div className='relative' ref={dropdownref}>
                    <img 
                        className='cursor-pointer' 
                        src={images.menu_icon} 
                        alt="Menu" 
                        onClick={handleToggle} 
                    />
                    {isDropdown && (
                        <div className=' absolute right-0 mt-2 w-46 bg-white border shadow-lg'>
                              <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-40">
                                    <Link to="/dashboard/doctors/my-appointment">My Appointments</Link>
                                </li>
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <div class="border-b border-gray-300"></div>
        </div>
    )
}
