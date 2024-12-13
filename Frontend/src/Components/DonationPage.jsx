import React from 'react';
import Donation from '../assets/Donation.png'
// import styles from './MyComponent.css';
const DonationPage = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Donate Now</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Your Donation Makes a Difference</h2>
          <p className="text-gray-400 mb-8">
            Your generous donation will help us provide critical services and support to those in need. Every contribution, no matter the size, has a meaningful impact.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="amount" className="block mb-2 font-medium">
                Donation Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="5"
                step="5"
                placeholder="Enter amount"
                className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
                required
              />
            </div>
            <div className="relative">
      <img src={Donation} alt="Donation Image" className="w-1/2 h-auto rounded-lg shadow-md" />
      {/* <button className={styles.donation-button}>Donate Now</button> */}
    </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonationPage;