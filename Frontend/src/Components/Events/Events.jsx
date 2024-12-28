import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    {
      title: 'Blood Donation Camp',
      date: '7/15/2023',
      type: 'BLOOD DONATION',
      imageUrl: 'https://imgs.search.brave.com/acn7oYgtFEA5TyxSq1GkOm1OS52e5ES7G3Bo9H1TnsY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2UzL2Fl/L2VmL2UzYWVlZjIy/OTJkMGRhMmU5Mzdj/YmMwOGQzMjcxZWEz/LmpwZw',
      description: 'Join us for a community blood donation drive.'
    },
    {
      title: 'Almshouse Charity Fundraiser',
      date: '7/22/2023',
      type: 'CHARITY',
      imageUrl: 'https://imgs.search.brave.com/5apGGVLRdTvBUNwvhLfrYO6EvqF7xhqjzlsbp_LoBss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFkLzI1/LzQ0LzFkMjU0NDZh/MWJhYmEzNGYyZGNh/ZmM1Yzc4NmFmYzM1/LmpwZw',
      description: 'Help raise funds for local almshouses.'
    },
    {
      title: 'Environmental Protection Protest',
      date: '7/30/2023',
      type: 'PROTEST',
      imageUrl: 'https://imgs.search.brave.com/5apGGVLRdTvBUNwvhLfrYO6EvqF7xhqjzlsbp_LoBss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFkLzI1/LzQ0LzFkMjU0NDZh/MWJhYmEzNGYyZGNh/ZmM1Yzc4NmFmYzM1/LmpwZw',
      description: 'Stand up for our planet and demand action on climate change.'
    },
    {
      title: 'Volunteer Tree Planting',
      date: '8/05/2023',
      type: 'VOLUNTEER',
      imageUrl: 'https://imgs.search.brave.com/5apGGVLRdTvBUNwvhLfrYO6EvqF7xhqjzlsbp_LoBss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFkLzI1/LzQ0LzFkMjU0NDZh/MWJhYmEzNGYyZGNh/ZmM1Yzc4NmFmYzM1/LmpwZw',
      description: 'Help beautify our city by planting trees in local parks.'
    },
    {
      title: 'Charity Gala Dinner',
      date: '9/01/2023',
      type: 'CHARITY',
      imageUrl: 'https://imgs.search.brave.com/5apGGVLRdTvBUNwvhLfrYO6EvqF7xhqjzlsbp_LoBss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFkLzI1/LzQ0LzFkMjU0NDZh/MWJhYmEzNGYyZGNh/ZmM1Yzc4NmFmYzM1/LmpwZw',
      description: 'Enjoy a formal dinner while supporting our local charities.'
    },
    {
      title: 'Dog Adoption Drive',
      date: '10/12/2023',
      type: 'ADOPTION',
      imageUrl: 'https://imgs.search.brave.com/5apGGVLRdTvBUNwvhLfrYO6EvqF7xhqjzlsbp_LoBss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFkLzI1/LzQ0LzFkMjU0NDZh/MWJhYmEzNGYyZGNh/ZmM1Yzc4NmFmYzM1/LmpwZw',
      description: 'Find a furry friend to join your family at our adoption event.'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search events..."
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => navigate('/add-event')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Event
          </button>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-400 text-sm mb-2">{event.date}</p>
              <p className="text-gray-300 mb-4">{event.description}</p>
              <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EventsPage;