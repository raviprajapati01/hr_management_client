import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation(); // Get the current location

  const isActive = (path) => {
    return location.pathname === path ? 'text-white' : 'text-gray-300';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">Employee Management System</Link>
        </div>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/employeeinfo" className={`${isActive('/employeeinfo')} hover:text-white`} aria-label="Employees">Employees-List</Link>
              <Link to="/attendance" className={`${isActive('/attendance')} hover:text-white`} aria-label="Attendance">Attendance</Link>
              <Link to="/performance" className={`${isActive('/performance')} hover:text-white`} aria-label="Performance">Performance</Link>
              <Link to="/employees" className={`${isActive('/employees')} hover:text-white`} aria-label="EmployeeManagement">EmployeeManagement</Link>
              {/* <Link to="/profile" className={`${isActive('/profile')} hover:text-white`} aria-label="profile">Profile</Link> */}

              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${isActive('/login')} hover:text-white`} aria-label="Login">Login</Link>
              <Link to="/signup" className={`${isActive('/signup')} hover:text-white`} aria-label="Signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
