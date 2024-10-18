import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { fetchEmployees, deleteEmployee, updateEmployee} from './apis';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';



const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEmployees(); // Ensure this returns the correct data structure
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`${API_URL}/employees/${employeeId}`);
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Employee List</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">Name</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">Email</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">Role</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">Salary</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{employee.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{employee.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{employee.jobRole}</td>
              <td className="py-2 px-4 border-b border-gray-200">{employee.salary}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="text-red-500 hover:text-red-700 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={()=>{
                    navigate('/employees')
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => window.location.href = `${API_URL}/employees/${employee._id}`}
                  className="text-green-500 hover:text-green-700"
                >
                  employee_Id
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
