// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); // Call the onLogout prop function passed from App.js
    navigate('/login'); // Redirect to login after logging out
  }, [onLogout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
