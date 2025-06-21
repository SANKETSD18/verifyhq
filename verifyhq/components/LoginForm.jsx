import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response is ok
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // Parse the response data
      const data = await res.json();
      
      // Store token and username in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username); // Store username
      alert('Login Successful!');
      navigate('/eventreq'); // Redirect to your desired route

    } catch (error) {
      alert(error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#2B0A3D] to-[#0A1F24] flex items-center justify-center overflow-hidden">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border text-pink-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border text-pink-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
