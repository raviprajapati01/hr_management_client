import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import Attendance from './components/Attendance';
import Performance from './components/Performance';
import Profile from './components/Profile';
import './App.css';
import Home from './pages/Home';
import EmployeeManagement from './components/employee';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for authentication
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Save token to local storage
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="/employeeinfo" element={<PrivateRoute element={<EmployeeList />} isAuthenticated={isAuthenticated} />} />
          <Route path="/attendance" element={<PrivateRoute element={<Attendance />} isAuthenticated={isAuthenticated} />} />
          <Route path="/performance" element={<PrivateRoute element={<Performance />} isAuthenticated={isAuthenticated} />} />
          <Route path="/employees" element={<PrivateRoute element={<EmployeeManagement/>} isAuthenticated={isAuthenticated} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile/>} isAuthenticated={isAuthenticated} />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
