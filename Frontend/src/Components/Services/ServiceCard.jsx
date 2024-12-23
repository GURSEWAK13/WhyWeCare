import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, description, icon, serviceId }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate(`/services/${serviceId}/create`);
  };

  const handleViewPosts = () => {
    navigate(`/services/${serviceId}/posts`);
  };

  return (
    <div className="bg-purple-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col p-2">
      {/* Header with Icon and Title */}
      <div>
        <div className="flex items-center gap-2">
          <div className="text-indigo-500 text-4xl">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 flex-grow">
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Buttons */}
      <div className="p-4 border-t bg-green-100 rounded-b-lg">
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleCreatePost}
            className="flex-1 bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
          >
            Create Post
          </button>
          <button 
            onClick={handleViewPosts}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 flex items-center justify-center"
          >
            {/* <span className="mr-2">👥</span> */}
            View Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;