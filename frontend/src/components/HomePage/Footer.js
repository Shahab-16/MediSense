import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12" id="contact">
      <div className="container mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand and Copyright */}
          <div>
            <h1 className="text-4xl font-extrabold text-blue-500">MediSense</h1>
            <p className="text-gray-400 mt-3">Your trusted healthcare companion.</p>
            <p className="text-gray-500 mt-4">© 2024 MediSense. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-400">
              {["Home", "Features", "About Us", "FAQs", "Contact"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 transition duration-300 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Healthcare Services */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Healthcare Services</h2>
            <ul className="space-y-2 text-gray-400">
              {["Emergency Care", "Appointments", "Medical Records", "Health Blog"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 transition duration-300 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact & Emergency Info */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Emergency Contact</h2>
            <p className="flex items-center space-x-2 text-gray-400">
              <FaPhoneAlt className="text-blue-400" />
              <span>+1 800-123-4567</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-400 mt-2">
              <FaEnvelope className="text-blue-400" />
              <span>support@medisense.com</span>
            </p>
            <p className="flex items-center space-x-2 text-gray-400 mt-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>123 Health St, Wellness City</span>
            </p>
          </div>
        </div>

        {/* Newsletter & Social Media */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6">
          {/* Newsletter Subscription */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-blue-400">Stay Updated</h2>
            <p className="text-gray-400 mt-2">Subscribe to receive the latest healthcare updates & tips.</p>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
              <button className="px-5 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition duration-300">Subscribe</button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" }
            ].map((social, index) => (
              <a key={index} href={social.link} className="text-gray-400 hover:text-blue-500 text-2xl transition duration-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
