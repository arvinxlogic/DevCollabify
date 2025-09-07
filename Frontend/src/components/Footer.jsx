// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              👨🏻‍💻 DevConnect
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Professional networking platform for developers worldwide. 
              Connect, collaborate, and grow your tech career.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm flex items-center">
                📧 <a href="mailto:arvindsinghq05@gmail.com" className="hover:text-blue-400 transition-colors ml-2">
                  arvindsinghq05@connectdev.online
                </a>
              </p>
              <p className="text-gray-400 text-sm flex items-center">
                🌐 <a href="https://connectdev.online" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors ml-2">
                  connectdev.online
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Home</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Pricing</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal (MANDATORY for Razorpay) */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="mailto:arvindsinghq05@gmail.com" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Email Support</a></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">Help Center</Link></li>
              <li><span className="text-gray-400 text-sm">Response: 24-48 hours</span></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DevConnect. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms</Link>
            <Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Contact</Link>
          </div>
        </div>

        {/* Razorpay Required Info */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">
            Secure payments powered by Razorpay | Business Email:{" "}
            <a href="mailto:arvindsinghq05@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              arvindsinghq05@connectdev.online
            </a>{" "}
            | Website:{" "}
            <a href="https://connectdev.online" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              https://connectdev.online
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;