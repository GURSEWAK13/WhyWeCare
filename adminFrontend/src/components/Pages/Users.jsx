import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const email = localStorage.getItem('userEmail');
      
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'emailFromAuthToken' : email
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch users');
      }

      if (response.status === 204) {
        return [];
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex items-center space-x-2 text-blue-900">
        <div className="w-6 h-6 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <span className="font-semibold">Loading users...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-red-50 text-red-700 px-6 py-4 rounded-lg shadow">
        <p className="font-semibold">Error: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>
      </div>

      {/* User Grid */}
      {filteredUsers.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-gray-500 text-lg">No users found</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.email}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-blue-900 p-4">
                <div className="flex items-center justify-center">
                  {/* User Avatar Placeholder */}
                  <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h3>
                <div className="flex items-center text-gray-600">
                  {/* Email Icon */}
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;