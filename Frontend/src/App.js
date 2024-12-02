import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/user/SignupForm';
import Login from './components/user/LoginForm';
import Employee from './components/Employee/Employee';
import EditEmployee from './components/Employee/EditEmployee';
import EmployeeInfo from './components/Employee/EmployeeInfo';
import AddEmployeeForm from './components/Employee/AddEmployeeForm';
import Logout from './components/user/LogOut';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in (e.g., by checking if a token exists in localStorage)
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function to handle logging out
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove token from localStorage
    setIsLoggedIn(false); // Update the login state
  };

  return (
    <Router>
      <Routes>
        {/* Redirect logic */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/employee" /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/employee" />
            ) : (
              <Signup onSignup={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/employee" />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/employee"
          element={isLoggedIn ? <Employee /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee/add"
          element={isLoggedIn ? <AddEmployeeForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee/:id"
          element={isLoggedIn ? <EmployeeInfo /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee/edit/:id"
          element={isLoggedIn ? <EditEmployee /> : <Navigate to="/login" />}
        />
        <Route
          path="/logout"
          element={<Logout onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
