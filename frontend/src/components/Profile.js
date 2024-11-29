import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/auth/profile', { name, email });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/auth/change-password', { currentPassword, newPassword });
      setMessage('Password changed successfully');
    } catch (error) {
      setMessage('Error changing password');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Update Profile</button>
      </form>

      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <label>Current Password:</label>
        <input 
          type="password" 
          value={currentPassword}
	  onChange={(e) => setCurrentPassword(e.target.value)} 
          required 
        />
        <label>New Password:</label>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;