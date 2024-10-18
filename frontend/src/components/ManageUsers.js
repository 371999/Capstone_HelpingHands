import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const UserRow = styled.tr`
  border: 1px solid #ddd;
`;

const UserCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <UserTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user._id}>
              <UserCell>{user.name}</UserCell>
              <UserCell>{user.email}</UserCell>
              <UserCell>{user.role}</UserCell>
              <UserCell>
                <DeleteButton onClick={() => handleDelete(user._id)}>Delete</DeleteButton>
              </UserCell>
            </UserRow>
          ))}
        </tbody>
      </UserTable>
    </div>
  );
};

export default ManageUsers;