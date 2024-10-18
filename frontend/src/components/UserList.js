import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersList.css';  // Assuming you will add styles in a separate CSS file

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:5000/users')
      .then(response => {
        console.log('Fetched users:', response.data);  // Check if data is fetched correctly
        setUsers(response.data);  // Store the users data in the state
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Email</th>
            {/* <th>Registered At</th> */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td> Assuming 'createdAt' is in the user data */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
