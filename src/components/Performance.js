import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

const Performance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [goal, setGoal] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [goals, setGoals] = useState([]); // New state to store goals

  const handleSetGoal = async () => {
    try {
      await axios.post(`${API_URL}/performance/setgoal`, { employeeId, goal });
      setGoals((prevGoals) => [...prevGoals, { employeeId, goal }]); // Add the new goal to the list
      setGoal(''); // Clear the input field
      setMessage('Goal set successfully!');
    } catch (error) {
      setMessage('Error setting goal.');
    }
  };

  const handleUpdateReview = async (id) => {
    try {
      await axios.put(`${API_URL}/performance/update/${id}`, { review });
      setMessage('Performance review updated successfully!');
    } catch (error) {
      setMessage('Error updating review.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Performance Management</h2>

      <div className="mb-4">
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Set Performance Goal"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleSetGoal}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Set Goal
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Enter Performance Review"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={() => handleUpdateReview(employeeId)}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
        >
          Update Review
        </button>
      </div>

      {message && (
        <p className="text-center text-red-500 font-semibold mt-4">{message}</p>
      )}

      {/* Separate div for displaying goals */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Set Goals:</h3>
        <ul className="list-disc pl-5">
          {goals.length > 0 ? (
            goals.map((item, index) => (
              <li key={index} className="text-gray-700">
                Employee ID: {item.employeeId}, Goal: {item.goal}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No goals set yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Performance;
