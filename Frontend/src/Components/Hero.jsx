import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white py-20 px-8 flex justify-center items-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Join Hands, Spread Care</h1>
        <p className="text-lg sm:text-xl mb-8">
          Make a difference in your community today. Together, we can create a healthier and more compassionate world.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md"
          >
            Find Opportunities
          </a>
          <a
            href="#"
            className="bg-white hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-md"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;