import React, { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from './apis';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Added phone
    jobRole: '', // Changed from role to jobRole
    salary: 0,
  });
  const [editId, setEditId] = useState(null);

  // Fetch employees when the component loads
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Fetch employees with loading and error handling
  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        const { data } = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!formData.name || !formData.email || !formData.phone || !formData.jobRole || formData.salary <= 0) {
      setError("All fields are required and salary must be greater than zero");
      return;
    }
  
    setLoading(true);
    try {
      if (editId) {
        await updateEmployee(editId, formData);
        setEditId(null);
      } else {
        await createEmployee(formData);
      }
      setFormData({ name: '', email: '', phone: '', jobRole: '', salary: 0 });
      const { data } = await fetchEmployees(); // Refresh employee list
      setEmployees(data);
    } catch (error) {
      setError("Failed to create/update employee");
    } finally {
      setLoading(false);
    }
  };
  

  // Handle delete employee
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      const { data } = await fetchEmployees(); // Refresh employee list
      setEmployees(data);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle edit employee
  const handleEdit = (employee) => {
    setEditId(employee._id);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone, // Updated field
      jobRole: employee.jobRole, // Updated field
      salary: employee.salary,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Employee Management</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Phone" // Updated field
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Job Role" // Updated field
          value={formData.jobRole}
          onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="col-span-2 p-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {editId ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">Employees List</h2>

      <ul className="space-y-4">
        {employees.map((employee) => (
          <li
            key={employee._id}
            className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
          >
            <span className="text-gray-700 font-medium">
              {employee.name} - {employee.jobRole} - {employee.salary} USD
            </span>
            <div>
              <button
                onClick={() => handleEdit(employee)}
                className="mr-3 px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(employee._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeManagement;
