import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const goToUsersList = () => {
    navigate('/users'); // Navigate to the Users List page when clicked
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={goToUsersList}>View Users List</button> {/* Button to navigate */}
    </div>
  );
};

export default Dashboard;
