import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminPanelContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
`;

const AdminTitle = styled.h1`
  color: #333;
`;

const AdminOptions = styled.div`
  display: flex;
  gap: 20px;
`;

const Option = styled(Link)`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const AdminPanel = () => {
  return (
    <AdminPanelContainer>
      <AdminTitle>Admin Panel</AdminTitle>
      <AdminOptions>
        <Option to="/admin/users">Manage Users</Option>
        <Option to="/admin/posts">Manage Donations</Option>
      </AdminOptions>
    </AdminPanelContainer>
  );
};

export default AdminPanel;