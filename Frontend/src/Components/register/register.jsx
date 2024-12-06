import React, { useState } from "react";
import Login from '../../assets/login.png'
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const statesAndCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Delhi": ["New Delhi", "Delhi Cantonment", "Karol Bagh", "Chandni Chowk"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      state,
      city,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 hidden md:flex items-center justify-center">
      <img src={Login} alt="Authentication" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-900 w-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <div className="flex flex-col items-center space-y-2 mb-4">
            <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
            <p className="text-sm text-gray-500">Enter your information to register</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                State
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity(""); // Reset city when state changes
                }}
              >
                <option value="">Select State</option>
                {Object.keys(statesAndCities).map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                City
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state} // Disable city dropdown if no state is selected
              >
                <option value="">Select City</option>
                {state &&
                  statesAndCities[state].map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-100 flex justify-center items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="flex justify-center items-center">
            <div className="border-t border-gray-400 flex-grow mr-4"></div>
            <span className="font-bold">OR</span>
            <div className="border-t border-gray-400 flex-grow ml-4"></div>
            </div>
            <div className="w-100 flex justify-center items-center">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Continue with Google
              </button>
            </div>
          </form>
          <p className="px-8 text-center text-sm text-gray-500">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
