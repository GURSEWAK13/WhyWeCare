import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState('');
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    type: '',
    imageUrl: '',
    description: '',
    address: ''
  });

  useEffect(() => {
    const state = localStorage.getItem('state');
    const city = localStorage.getItem('city');
    
    if (!state || !city) {
      alert('Please sign in to add an event');
      navigate('/signin');
      return;
    }
    
    setUserState(state);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const state = localStorage.getItem('state');
      const city = localStorage.getItem('city');

      if (!state || !city) {
        alert('Please sign in to add an event');
        navigate('/signin');
        return;
      }

      const response = await fetch('http://localhost:8081/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...eventData,
          state: state,
          city: city,
          date: new Date(eventData.date).toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert(error.message);
    }
  };

  const eventTypes = [
    'BLOOD DONATION',
    'CHARITY',
    'PROTEST',
    'VOLUNTEER',
    'ADOPTION',
    'OTHER'
  ];

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create New Event
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2"
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Event Type
              </label>
              <select
                name="type"
                value={eventData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2"
                required
              >
                <option value="">Select event type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={eventData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2"
                placeholder="Enter address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={eventData.imageUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2"
                placeholder="Enter event description"
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;