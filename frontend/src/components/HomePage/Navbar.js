import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { login, setLogin } = useContext(StoreContext);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleSignUpClick = () => {
        setLogin(true);
        navigate('/login');
    };

    return (
        <div className="navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-4 lg:px-20 py-3">
            <div className="text-3xl gap-1 tracking-wider font-bold text-blue-800 pl-[40px]">
                MediSense
            </div>
            <div className="hidden space-x-9 sm:block">
                <a href="#" className="text-black-300 p-4">Home</a>
                <a href="#about" className="text-black-300 p-4">About</a>
                <a href="#medisenseDescription" className="text-black-300 p-4">Services</a>
                <a href="#contact" className="text-black-300 p-4">Contact</a>
            </div>
            <button
                onClick={handleSignUpClick}
                className="text-center p-2 bg-blue-800 hover:bg-blue-600 mt-1 text-white font-outfit rounded-lg hidden sm:block"
            >
                Sign Up
            </button>
            <div className="text-left mt-5 sm:hidden" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8a2 2 0 110-4 2 2 0 010 4zm0 2a2 2 0 110 4 2 2 0 010-4zm0 6a2 2 0 110 4 2 2 0 010-4z" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home</a>
                            <a href="#about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</a>
                            <a href='#medisenseDescription' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Services</a>
                            <a href="#contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
                            <div className="border-t border-gray-200"></div> {/* Divider */}
                            <button
                                onClick={handleSignUpClick}
                                className="w-36 mt-1 py-3 px-3 bg-blue-800 hover:bg-blue-600 text-white font-bold rounded-md text-center text-xs"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
