import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}`)
      .then(response => {
        setUser(response.data); // Store the user data in the state
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.email}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Registered on: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default UserProfile;
