import React, { useState } from 'react';
import Donation from '../../assets/Donation.png';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      amount,
      name,
      email,
      message,
    };
    
    // console.log(donationData);
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/donation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'emailFromAuthToken' : email
        },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        alert('Thank you for your donation!');
        // Reset the form if needed
        setAmount('');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <section className="bg-gray-900 text-white py-16 px-8 md:px-16">
      <div className="max-w mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Donate Now</h1>
        <div className="flex">
          <img src={Donation} alt="Donation Image" className="w-1/2 h-auto rounded-lg shadow-md" />

          <div className="bg-gray-800 rounded-lg p-8 md:p-12 w-full ml-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Donation Makes a Difference</h2>
            <p className="text-gray-400 mb-8 text-center">
              Your generous donation will help us provide critical services and support to those in need. Every contribution, no matter the size, has a meaningful impact.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Leave a message"
                  className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="relative">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4 w-full hover:bg-blue-700"
                  onClick={()=>{handleSubmit}}
                >
                  Donate Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationPage;
