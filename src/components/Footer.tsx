import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white py-12 px-8">
      {/* Top Section */}
      <div className="container mx-auto px-6 md:flex md:justify-between md:items-center">
        <div>
          <p className="text-gray-400 mb-2">HEARD ENOUGH? →</p>
          <h2 className="text-4xl font-bold mb-2">
            Contact us
            <span className="block w-20 h-1 bg-yellow-400 mt-2"></span>
          </h2>
        </div>
        <div className="flex items-center justify-center mt-6 md:mt-0">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer transform transition-transform hover:scale-110 hover:shadow-xl">
            <span className="text-black text-2xl">→</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center mt-12">
        {/* Left Section: Brand and Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            SponsoHive
          </h1>
          <p className="text-gray-400 text-lg">
            Connecting sponsors and creators with innovative tools for collaboration and growth.
          </p>
          <p className="text-xs text-gray-500">© 2024 SponsoHive. All rights reserved.</p>
        </div>

        {/* Right Section: Quick Links */}
        <div className="space-y-6 md:ml-8 lg:ml-12">
          {/* Quick Links */}
          <div className="space-y-4 text-center">
            <h5 className="text-xl font-bold text-purple-400 mb-2">Quick Links</h5>
            <div className="grid grid-cols-2 gap-y-4"> 
              <a
                href="/about"
                className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-105"
              >
                About Us
              </a>
              <a
                href="/privacy"
                className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-105"
              >
                Privacy Policy
              </a>
              <a
                href="/contact"
                className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="/terms"
                className="text-gray-300 hover:text-purple-400 transition-transform transform hover:scale-105"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Section: Shifted to the Right Extreme */}
        <div className="space-y-4 ml-auto text-center">
          <h5 className="text-xl font-bold text-pink-400">Follow Us</h5>
          <div className="flex justify-center space-x-10 pr-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-500 h-8 hover:scale-110 transform transition-transform"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-blue-400 h-8 hover:scale-110 transform transition-transform"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-pink-500 h-8 hover:scale-110 transform transition-transform"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-blue-700 h-8 hover:scale-110 transform transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Border Animation */}
      <div className="mt-8 border-t border-gray-700"></div>
      <div className="mt-4 text-center text-gray-500 text-sm">
        Made with ❤️ by the SponsoHive Team
      </div>
    </footer>
  );
};

export default Footer;
