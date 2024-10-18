import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';


const Attendance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [attendanceId, setAttendanceId] = useState(null);
  const [message, setMessage] = useState('');

  const handleCheckIn = async () => {
    try {
      const response = await axios.post(`${API_URL}/attendance/checkin`, { employeeId });
      setAttendanceId(response.data._id);
      setMessage('Checked in successfully!');
    } catch (error) {
      setMessage('Error checking in.');
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.put(`${API_URL}/attendance/checkout/${attendanceId}`);
      setMessage('Checked out successfully!');
    } catch (error) {
      setMessage('Error checking out.');
    }
  };

  const handleRequestLeave = async (leaveType) => {
    try {
      await axios.post(`${API_URL}/attendance/leave`, { employeeId, leaveType });
      setMessage('Leave requested successfully!');
    } catch (error) {
      setMessage('Error requesting leave.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Time and Attendance</h2>
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        placeholder="Enter Employee ID"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="grid grid-cols-1 gap-4 mb-4">
        <button
          onClick={handleCheckIn}
          className="w-full p-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Check Out
        </button>
        <button
          onClick={() => handleRequestLeave('Vacation')}
          className="w-full p-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Request Vacation Leave
        </button>
        <button
          onClick={() => handleRequestLeave('Sick')}
          className="w-full p-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Request Sick Leave
        </button>
        <button
          onClick={() => handleRequestLeave('Personal')}
          className="w-full p-3 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Request Personal Leave
        </button>
      </div>
      {message && (
        <p className="mt-4 text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};


export default Attendance;