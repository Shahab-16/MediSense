// import React from 'react'

// export default function Footer() {
//     return (
//         <div className='md:mx-10'>
//             {/* flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm */}
//             <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm '>
//                 {/* Logo */}
//                 <div>
//                     <p className='text-[30px] font-bold text-blue-800'><a href="/">MediSense</a></p>
//                     <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//                 </div>
//                 <div>
//                     <p className='text-xl font-medium'>COMPANY</p>
//                     <ul>Home</ul>
//                     <ul>About Us</ul>
//                     <ul>Contact Us</ul>
//                     <ul>Privacy Policy</ul>
//                 </div>
//                 <div>
//                     <p className='text-xl font-medium'>GET IN TOUCH</p>
//                     <ul>+91-9305363223</ul>
//                     <ul>medisense@gmail.com</ul>
//                 </div>
//             </div>
//         </div>
//     )
// }
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-300 py-12 rounded-md shadow-black-500/50" id="contact">
      <div className="container mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand and Copyright */}
          <div>
            <h1 className="text-4xl font-extrabold text-black">MediSense</h1>
            <p className="text-black mt-3">Your trusted healthcare companion.</p>
            <p className="text-black mt-4">© 2024 MediSense. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "Features", "About Us", "FAQs", "Contact"].map((item, index) => (
                <li key={index} className="hover:transition duration-300 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Healthcare Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Healthcare Services</h2>
            <ul className="space-y-2">
              {["Emergency Care", "Appointments", "Medical Records", "Health Blog"].map((item, index) => (
                <li key={index} className="hover: transition duration-300 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact & Emergency Info */}
          <div>
            <h2 className="text-xl font-semibold  mb-4">Emergency Contact</h2>
            <p className="flex items-center space-x-2 ">
              <FaPhoneAlt className="" />
              <span>+1 800-123-4567</span>
            </p>
            <p className="flex items-center space-x-2 mt-2">
              <FaEnvelope className="" />
              <span>support@medisense.com</span>
            </p>
            <p className="flex items-center space-x-2 mt-2">
              <FaMapMarkerAlt className="" />
              <span>123 Health St, Wellness City</span>
            </p>
          </div>
        </div>

        {/* Newsletter & Social Media */}
      </div>
    </footer>
  );
};

export default Footer;
