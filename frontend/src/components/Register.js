import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigating to other pages

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to register the user
      const response = await axios.post('http://localhost:5000/register', {
        email,
        password,
      });
      setMessage(response.data.message);

      // If registration is successful, redirect to the homepage
      if (response.status === 201) {
        navigate('/'); // Redirect to homepage after successful registration
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error occurred during registration');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
}

export default Register;
