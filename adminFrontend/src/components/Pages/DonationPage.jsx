import React, { useState, useEffect } from "react";

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch all donations from the API
  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const email = localStorage.getItem('userEmail');
      
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/donation`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'emailFromAuthToken' : email
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const data = await response.json();
      setDonations(data.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Format date for detailed view
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Donation List
      </h1>
      {loading ? (
        <div className="text-center">Loading donations...</div>
      ) : (
        <div className="space-y-6">
          {/* Donations Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Message</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">${donation.amount}</td>
                    <td className="px-6 py-3">{donation.name}</td>
                    <td className="px-6 py-3">{donation.email}</td>
                    <td className="px-6 py-3">{donation.message || "No message"}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed View Modal */}
          {selectedDonation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold mb-4">Donation Details</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700">Amount</h3>
                    <p className="text-2xl text-green-600">${selectedDonation.amount}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Donor Name</h3>
                      <p>{selectedDonation.name}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700">Email</h3>
                      <p>{selectedDonation.email}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Message</h3>
                    <p className="bg-gray-50 p-3 rounded-lg">
                      {selectedDonation.message || "No message provided"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Donation Date</h3>
                    <p>{formatDate(selectedDonation.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationsPage;