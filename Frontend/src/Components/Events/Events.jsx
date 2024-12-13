import React, { useState } from 'react';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: '',
    imageUrl: '',
    description: ''
  });

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

  const handleAddEvent = () => {
    setShowAddEventForm(true);
  };

  const handleSaveEvent = () => {
    events.push(newEvent);
    setShowAddEventForm(false);
    setNewEvent({ title: '', date: '', type: '', imageUrl: '', description: '' });
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setNewEvent({ ...newEvent, imageUrl: e.target.value });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search events..."
            className="bg-gray-700 text-white px-4 py-2 rounded-md mr-4"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      </header>

      {showAddEventForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="bg-gray-200 px-4 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block font-medium mb-2">
                Date:
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="bg-gray-200 px-4 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block font-medium mb-2">
                Type:
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                className="bg-gray-200 px-4 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block font-medium mb-2">
                Image URL:
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={newEvent.imageUrl}
                onChange={handleImageUpload}
                className="bg-gray-200 px-4 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="bg-gray-200 px-4 py-2 rounded-md w-full h-20"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                onClick={handleSaveEvent}
              >
                Save
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => setShowAddEventForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <div key={index} className="bg-gray-800 rounded-md shadow-md overflow-hidden flex flex-col items-center justify-center">
            <img src={event.imageUrl} alt={event.title} className="mb-4 rounded-md w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{event.title}</h2>
              <p className="text-gray-400 mt-2">{event.date}</p>
              <p className="text-gray-300 mt-2">{event.description}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
                {event.type}
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EventsPage;