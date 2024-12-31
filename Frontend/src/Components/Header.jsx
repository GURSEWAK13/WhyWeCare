import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const userName = localStorage.getItem('name');
  const userState = localStorage.getItem('state');
  const userCity = localStorage.getItem('city');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-10" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/events" className="hover:text-blue-500">Events</Link>
            <Link to="/services" className="hover:text-blue-500">Services</Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-medium">{userName}</span>
                  <span className="text-gray-400 ml-2">
                    {userCity && userState ? `${userCity}, ${userState}` : userState}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}