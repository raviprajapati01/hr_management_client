import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

// Create a new employee with error handling
export const createEmployee = async (employeeData) => {
  try {
    return await axios.post(`${API_URL}/employees`, employeeData);
  } catch (error) {
    console.error('Error creating employee:', error.response?.data || error.message);
    throw error;
  }
};

// Update an employee by ID with error handling
export const updateEmployee = async (id, employeeData) => {
  try {
    return await axios.put(`${API_URL}/employees/${id}`, employeeData);
  } catch (error) {
    console.error('Error updating employee:', error.response?.data || error.message);
    throw error;
  }
};

// Delete an employee by ID with error handling
export const deleteEmployee = async (id) => {
  try {
    return await axios.delete(`${API_URL}/employees/${id}`);
  } catch (error) {
    console.error('Error deleting employee:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch all employees with error handling
export const fetchEmployees = async () => {
  try {
    return await axios.get(`${API_URL}/employeeinfo`);
  } catch (error) {
    console.error('Error fetching employees:', error.response?.data || error.message);
    throw error;
  }
};

// User Signup with error handling
export const signupUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/auth/register`, userData);
  } catch (error) {
    console.error('Error signing up user:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // Ensure the token is saved to localStorage after login
    const token = response.data.token; // Make sure your API response includes the token here
    localStorage.setItem('token', token);

    return response.data; // Return the login response data if needed
  } catch (error) {
    console.error('Error logging in user:', error.response?.data || error.message);
    throw error;
  }
};



export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  
  console.log("Retrieved Token: ", token); // Add a debug log to check if the token is being retrieved
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include token in the request
      }
    });
    return response.data; // Return the actual user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error fetching user profile');
  }
};

