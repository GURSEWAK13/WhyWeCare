import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold">WeCare</div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a href="#">WeCare</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Events</a>
          </li>
          <li>
            <a href="#">Volunteer</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4">
        <a href="#" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">
          Donate Now
        </a>
        <a href="#" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">
          Sign In
        </a>
        <a href="#" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">
          Register
        </a>
      </div>
    </header>
  );
};

export default Header;