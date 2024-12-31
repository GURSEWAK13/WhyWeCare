import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import banner from '../../assets/signInBanner.svg';

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const getDeviceInfo = () => {
    return {
      device: navigator.platform,
      browser: navigator.userAgent,
      location: 'Not available' // You could use a geolocation API here
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const user = {
      email,
      password,
      deviceInfo: getDeviceInfo()
    };
  
    try {
      const response = await fetch('http://localhost:8081/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setFormStatus({ email: "error", password: "error" });
        setErrorMessage(errorData.message || 'Invalid email or password');
        throw new Error(errorData.message || 'Sign in failed');
      }
  
      const data = await response.json();
      console.log('API response:', data);
      
      setFormStatus({ email: "success", password: "success" });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('state', data.user.state);
      localStorage.setItem('city', data.user.city);
  
      setTimeout(() => {
        window.location.href = '/events';
      }, 500);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getInputStyles = (fieldName) => {
    const baseStyles = "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200";
    
    if (formStatus[fieldName] === "error") {
      return `${baseStyles} border-red-500 focus:ring-red-500`;
    } else if (formStatus[fieldName] === "success") {
      return `${baseStyles} border-green-500 focus:ring-green-500`;
    }
    return `${baseStyles} border-gray-300 focus:ring-blue-500 focus:border-transparent`;
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
              {errorMessage && (
                <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
              )}
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
                  className={getInputStyles("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={getInputStyles("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign In
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