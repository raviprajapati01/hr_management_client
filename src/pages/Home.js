import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import '../components/EmployeeForm'; // Import EmployeeForm component if needed

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://user-images.githubusercontent.com/72408657/130641993-de770c59-3c85-492a-b49b-3e2bc8cbf0f9.png')" }} // Replace with your actual image URL
    >
      <div className="bg-white bg-opacity-100 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Employee Portal</h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage employee information, attendance, and much more from here.
        </p>
        <Link to="/attendance" className="inline-block px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600">
          Go to Attendance
        </Link>
      </div>
    </div>
  );
};

export default Home;
