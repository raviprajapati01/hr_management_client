import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from './apis'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    const getUserProfile = async () => {
  try {
    const response = await fetchUserProfile(); // API call to get user profile
    setUser(response); // You might already get the profile object, not `response.data`
    setLoading(false);
  } catch (error) {
    setError('Failed to fetch profile data.');
    setLoading(false);
  }
};


    getUserProfile();
  }, []);

  const handleLogout = () => {
    // Clear session or authentication token here
    navigate('/login'); // Use navigate instead of history.push
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>
      <div className="mb-4">
        <strong>Username: </strong>
        <span>{user?.username}</span>
      </div>
      <div className="mb-4">
        <strong>Email: </strong>
        <span>{user?.email}</span>
      </div>
      <div className="mb-4">
        <strong>Phone: </strong>
        <span>{user?.phone}</span>
      </div>
      <div className="mb-4">
        <strong>Role: </strong>
        <span>{user?.role}</span>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
