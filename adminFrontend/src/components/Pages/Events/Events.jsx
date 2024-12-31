import React, { useState } from 'react';
import statesAndCities from './states';

export default function EventsPage() {
  const [loading, setLoading] = useState({});
  const [stateEvents, setStateEvents] = useState({});
  const [showForm, setShowForm] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: '',
    imageUrl: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      type: '',
      imageUrl: '',
      description: ''
    });
  };

  const handleSubmit = async (state, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/events/${state}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, state })
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      // Refresh the events list
      await stateContent(state);
      
      // Reset form and hide it
      resetForm();
      setShowForm(prev => ({ ...prev, [state]: false }));

    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  const deleteEvent = async (state, eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/events/${state}/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setStateEvents(prev => ({
        ...prev,
        [state]: prev[state].filter(event => event._id !== eventId)
      }));

    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const stateContent = async (state) => {
    setLoading(prev => ({ ...prev, [state]: true }));
    
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/events/${state}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch state data');
      }
  
      const data = await response.json();
      const eventsArray = Array.isArray(data) ? data : [];
      setStateEvents(prev => ({
        ...prev,
        [state]: eventsArray
      }));
      
    } catch (error) {
      console.error('Error:', error);
      setStateEvents(prev => ({
        ...prev,
        [state]: []
      }));
    } finally {
      setLoading(prev => ({ ...prev, [state]: false }));
    }
  };

  const renderAddEventForm = (state) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Add New Event</h3>
      <form onSubmit={(e) => handleSubmit(state, e)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowForm(prev => ({ ...prev, [state]: false }));
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  const renderEventCard = (event, state) => (
    <div 
      key={event._id}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="w-full h-48">
        <img 
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Event+Image";
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {event.type}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {event.description}
        </p>
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => deleteEvent(state, event._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderStateSection = (state) => {
    const events = stateEvents[state.name] || [];
    
    return (
      <div key={state.name} className="mb-12">
        {/* State Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3 h-64 md:h-auto">
              <img 
                src={state.imageUrl}
                alt={`${state.name} scenery`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=State+Image";
                }}
              />
            </div>
            
            {/* Content Section */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{state.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">Capital: {state.capital}</p>
                </div>
                <button 
                  className={`${loading[state.name] 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  } text-white py-2 px-6 rounded-full transition-colors duration-300 font-medium shadow-md`}
                  onClick={() => stateContent(state.name)}
                  disabled={loading[state.name]}
                >
                  {loading[state.name] ? 'Loading...' : `Show Events`}
                </button>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {state.description}
              </p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Population: </span>
                    {state.population}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Button */}
        <button
          onClick={() => setShowForm(prev => ({ ...prev, [state.name]: !prev[state.name] }))}
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mb-6 transition-colors duration-300"
        >
          {showForm[state.name] ? 'Cancel Add Event' : 'Add New Event'}
        </button>

        {/* Add Event Form */}
        {showForm[state.name] && renderAddEventForm(state.name)}

        {/* Events Section */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => renderEventCard(event, state.name))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            {loading[state.name] ? (
              <p className="text-gray-600">Loading events...</p>
            ) : stateEvents[state.name] ? (
              <p className="text-gray-600">No events found for {state.name}</p>
            ) : (
              <p className="text-gray-600">Click 'Show Events' to load events for {state.name}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">EXPLORE INDIA</h1>
      <div className="max-w-7xl mx-auto">
        {statesAndCities.map(state => renderStateSection(state))}
      </div>
    </div>
  );
}