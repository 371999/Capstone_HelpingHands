import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const PostRow = styled.tr`
  border: 1px solid #ddd;
`;

const PostCell = styled.td`
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

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/admin/donations');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/donations/${id}`);
    setPosts(posts.filter(post => post._id !== id));
  };

  return (
    <div>
      <h2>Manage Donations</h2>
      <PostTable>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Donor</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <PostRow key={post._id}>
              <PostCell>{post.itemName}</PostCell>
              <PostCell>{post.donor.name}</PostCell>
              <PostCell>{post.location}</PostCell>
              <PostCell>{post.status}</PostCell>
              <PostCell>
                <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
              </PostCell>
            </PostRow>
          ))}
        </tbody>
      </PostTable>
    </div>
  );
};

export default ManagePosts;