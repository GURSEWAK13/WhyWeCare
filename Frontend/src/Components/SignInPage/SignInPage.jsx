import React from 'react';
import banner from '../../assets/signInBanner.png'
export default function SignInPage() {
  return (
    <div className="flex h-screen">
      <div className="w-3/5 bg-gradient-to-br from-blue-500 to-purple-600 hidden md:flex items-center justify-center relative overflow-hidden">
        <img src={banner} alt="Welcome" className="w-full h-full object-fill"/>
      </div>
      <div className="bg-white w-full md:w-2/5 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-gray-300 flex-grow"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px bg-gray-300 flex-grow"></div>
            </div>
            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.75c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.93-6.17-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.83 14.13c-.25-.69-.38-1.43-.38-2.19s.14-1.5.38-2.19V6.91H2.18A9.995 9.995 0 0 0 1 12c0 1.61.39 3.14 1.08 4.45l3.75-2.92z" fill="#FBBC05"/>
                <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.91l3.75 2.92c.87-2.6 3.3-4.53 6.17-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account? 
            <a href="/register" className="ml-1 text-blue-600 hover:text-blue-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}