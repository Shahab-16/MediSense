import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid grid-cols-4 gap-4">
                    {/* Left Side */}
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold text-blue-800">MediSense</h1>
                        <p className="text-gray-400">© 2024 MediSense. All rights reserved.</p>
                    </div>
                    {/* Links */}
                    {/* <div className='grid grid-col md:grid grid-cols-3 gap-[5rem]'> */}
                        {/* <div> */}
                            <div className='list-none'>
                                <h1 className='font-bold'>Explore</h1>
                                <li href="#">Features</li>
                                <li href="#">About Us</li>
                                <li href="#">FAQs</li>
                                <li href="#">Contact</li>
                                <li href="#">Login</li>
                            </div>
                        {/* </div> */}
                        {/* <div> */}
                            <div className='list-none'>
                                <h1 className='font-bold'>Legal</h1>
                                <li href="#">Privacy Policy</li>
                                <li href="#">Terms of Services</li>
                                <li href="#">Documentation</li>
                                <li href="#">Site Map</li>
                            </div>
                        {/* </div> */}
                        {/* <div> */}
                            <div>
                                <h1 className='font-bold'>Subscribe</h1>
                                <p>Subscribe to get the latest news from us</p>
                                <div class="flex">
                                    <input type="text" placeholder="Email Address" className="flex-grow w-4/5 border p-2" />
                                    <button className="w-2/5 bg-blue-800 text-white p-2 hover:bg-blue-600 rounded-tr-md rounded-br-md">Submit</button>
                                </div>
                            </div>
                        {/* </div> */}
                    {/* </div> */}

                    {/* Social Media */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-teal-400 hover:text-teal-500 transition-colors">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-teal-400 hover:text-teal-500 transition-colors">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-teal-400 hover:text-teal-500 transition-colors">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-teal-400 hover:text-teal-500 transition-colors">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
