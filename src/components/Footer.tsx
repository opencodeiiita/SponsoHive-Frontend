import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-yellow-300 py-1 px-8">
      {/* Bottom Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mt-12">
        {/* Left Section: Brand and Info */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300">
            SponsoHive
          </h1>
          <p className="text-lg">
            Connecting sponsors and creators with innovative tools for collaboration and growth.
          </p>
          <p className="text-xs">© 2024 SponsoHive. All rights reserved.</p>
        </div>

        {/* Right Section: Quick Links */}
        <div className="space-y-3 md:ml-8 lg:ml-12">
          <div className="space-y-6 text-center">
            <h5 className="text-xl font-bold mb-2">Quick Links</h5>
            <div className="grid grid-cols-3 gap-x-4">
              <a
                href="/about"
                className="hover:text-yellow-400 transition-transform transform hover:scale-105 underline"
              >
                About Us
              </a>
              <a
                href="/privacy"
                className="hover:text-yellow-400 transition-transform transform hover:scale-105 underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-yellow-400 transition-transform transform hover:scale-105 underline"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4 ml-auto text-center">
          <h5 className="text-xl font-bold">Follow Us</h5>
          <div className="flex justify-center space-x-10 pr-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="h-8 transition-transform transform hover:scale-110"
                style={{ backgroundColor: 'black', padding: '10px', borderRadius: '50%' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'yellow')}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-8 transition-transform transform hover:scale-110"
                style={{ backgroundColor: 'black', padding: '10px', borderRadius: '50%' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'yellow')}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-8 transition-transform transform hover:scale-110"
                style={{ backgroundColor: 'black', padding: '10px', borderRadius: '50%' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'yellow')}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="h-8 transition-transform transform hover:scale-110"
                style={{ backgroundColor: 'black', padding: '10px', borderRadius: '50%' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'yellow')}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Border Animation */}
      <div className="mt-8 border-t border-yellow-700"></div>
      <div className="mt-4 text-center text-sm">
        Made with ❤️ by the SponsoHive Team
      </div>
    </footer>
  );
};

export default Footer;
