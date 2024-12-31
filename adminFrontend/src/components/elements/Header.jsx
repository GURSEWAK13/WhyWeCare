import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const name = localStorage.getItem('userName') || 'Guest';

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userName');
    navigate('/');
  };

  // Get user's name from localStorage or default to 'Guest'

  return (
    <header className="bg-gray-900 text-white py-3 px-6 md:px-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <a href="/" className="hover:text-gray-400">WeCare {name}</a>
      </div>

      <div className="flex space-x-4 items-center">
        
        
        <nav
          className={`
            flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6
            ${isMenuOpen ? 'block' : 'hidden'}
            md:block
          `}
        >
          <a href="/events" className="hover:text-gray-400">Events</a>
          <a href="/users" className="hover:text-gray-400">Users</a>
          <a href="/donationPage" className="hover:text-gray-400">Donations</a>
        
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
        </nav>
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
