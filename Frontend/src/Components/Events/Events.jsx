import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const statesAndCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Delhi": ["New Delhi", "Delhi Cantonment", "Karol Bagh", "Chandni Chowk"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah"],
  };

  useEffect(() => {
    // Check authentication and get user info
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const state = localStorage.getItem('state');
    const city = localStorage.getItem('city');

    if (token && name && state) {
      setUserInfo({ name, state, city });
      setSelectedState(state);
      setSelectedCity(city);
      fetchEvents(state);
    } else {
      // Fetch all events when no state is selected
      fetchEvents('all');
    }
  }, []);

  useEffect(() => {
    // Fetch events whenever state selection changes
    fetchEvents(selectedState || 'all');
  }, [selectedState]);

  const fetchEvents = async (state) => {
    try {
      const endpoint = state === 'all' ? 
        'http://localhost:8081/events' : 
        `http://localhost:8081/events/${state}`;

      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  const handleAddEvent = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to add an event');
      navigate('/signin');
      return;
    }
    navigate('/add-event');
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedState || selectedState === 'all' || event.state === selectedState) &&
    (!selectedCity || event.city === selectedCity)
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 py-4 px-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Events</h1>
          <button 
            onClick={handleAddEvent}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Event
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search events..."
            className="bg-gray-700 text-white px-4 py-2 rounded-md flex-grow"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('');
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            <option value="">All States</option>
            {Object.keys(statesAndCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {selectedState && (
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">All Cities</option>
              {statesAndCities[selectedState].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
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
              <div className="flex justify-between items-center">
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {event.type}
                </span>
                <span className="text-sm text-gray-400">
                  {event.city}, {event.state}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EventsPage;