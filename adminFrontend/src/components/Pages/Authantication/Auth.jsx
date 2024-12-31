import React, { useState } from 'react';
import RegisterPage from './RegisterPage';
import SignInPage from './SignInPage';
import Logo from "../../../assets/we.png"
export default function Auth() {
  // State to toggle between SignIn and Register
  const [isRegistering, setIsRegistering] = useState(false);

  // Toggle between SignIn and Register
  const toggleAuthMode = () => {
    setIsRegistering((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <img 
          src={Logo} 
          alt="Description of Image" 
          className="max-w-full h-auto rounded-lg "
        />
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          {isRegistering ? 'Welcome' : 'Welcome Back'}
        </h2>
        
        {/* Conditionally render RegisterPage or SignInPage */}
        {isRegistering ? <RegisterPage /> : <SignInPage />}

        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            {isRegistering ? (
              <>
                Already have an account?{' '}
                <button 
                  onClick={toggleAuthMode} 
                  className="text-blue-600 hover:text-blue-800 font-semibold">
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  onClick={toggleAuthMode} 
                  className="text-blue-600 hover:text-blue-800 font-semibold">
                  Register
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
