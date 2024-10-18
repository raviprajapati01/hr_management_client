import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';


const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    jobRole: '', // Updated to match your model
    salary: '',
  });

  const { id } = useParams(); // For Edit case
  const navigate = useNavigate(); // For navigation after submit

  useEffect(() => {
    // If the ID is present, fetch the employee data for editing
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(`${API_URL}/employees/${id}`);
          setEmployee(response.data);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update existing employee
        await axios.put(`${API_URL}/employees/${id}`, employee);
        alert('Employee updated successfully!');
      } else {
        // Add new employee
        await axios.post(`${API_URL}/employees`, employee);
        alert('Employee added successfully!');
      }
      navigate('/employees'); // Redirect to the employees list
    } catch (error) {
      console.error('Error saving employee data:', error);
      if (error.response && error.response.status === 400) {
        alert('Validation error: ' + error.response.data.message);
      } else {
        alert('An error occurred while saving employee data.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">{id ? 'Edit' : 'Add'} Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <input
            type="text"
            name="jobRole" // Updated to match your model
            value={employee.jobRole} // Updated to match your model
            onChange={handleInputChange}
            placeholder="Job Role"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            placeholder="Salary"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {id ? 'Update' : 'Add'} Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
