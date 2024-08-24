import { useState, useEffect, useRef } from 'react';
import {images} from '../assets/asset';
 
export default function NavBar() { 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for outside click
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex justify-between items-center max-w-[1600px] mx-auto px-4 lg:px-20 py-3">
      {/* Logo */}
      <div className="text-3xl gap-1 tracking-wider font-bold text-blue-800 pl-[40px]">
        MediSense
      </div>
      
      {/* Links (Hidden on small screens) */}
      <div className="hidden space-x-9 sm:block">
        <a href="#" className="text-black-300 p-4">Home</a>
        <a href="#" className="text-black-300 p-4">About</a>
        <a href="#" className="text-black-300 p-4">Services</a>
        <a href="#" className="text-black-300 p-4">Contact</a>
      </div>

      {/* Sign Up Button (Hidden on small screens) */}
      <button className='text-center p-2 bg-blue-800 hover:bg-blue-600 mt-1 text-white font-outfit rounded-lg hidden sm:block'>Sign Up</button>

      {/* Dropdown for Small Screens */}
      <div className="text-left mt-5 sm:hidden" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8a2 2 0 110-4 2 2 0 010 4zm0 2a2 2 0 110 4 2 2 0 010-4zm0 6a2 2 0 110 4 2 2 0 010-4z" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Services</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
