import React, { useState } from "react";
import banner from '../../assets/signInBanner.svg'
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = {
      email,
      password,
    };
  
    try {
      const response = await fetch('http://localhost:8081/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
  
      const data = await response.json();
      console.log('API response:', data);
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('state', data.user.state);
  
    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-3/5 hidden md:flex items-center justify-center relative overflow-hidden">
        <img src={banner} alt="Welcome" className="w-full h-full object-cover rounded-3xl p-2"/>
      </div>
      <div className="bg-white w-full md:w-2/5 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="I steal Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Create Account
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