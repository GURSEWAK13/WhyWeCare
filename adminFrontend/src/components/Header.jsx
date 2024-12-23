import React, { useState } from 'react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-900 text-white py-3 px-6 md:px-4 flex justify-between items-center ">
      <div className="text-xl font-bold">WeCare</div>
      <nav
        className={`
          flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6
          ${isMenuOpen ? 'block' : 'hidden'}
          md:block
        `}
      >
        <a href="/" className="hover:text-gray-400">WeCare</a>
        <a href="/services" className="hover:text-gray-400">Services</a>
        <a href="/events" className="hover:text-gray-400">Events</a>
        <a href="#" className="hover:text-gray-400">Volunteer</a>
        <a href="#" className="hover:text-gray-400">Contact</a>
      </nav>
      <div className="flex space-x-4">
        <a href="#" className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">
          Donate Now
        </a>
        <a href="/signin" className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">
          Sign In
        </a>
        <a href="/register" className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">
          Register
        </a>
        <button
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;