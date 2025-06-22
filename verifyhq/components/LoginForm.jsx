import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false); // 🔁 Toggle login/register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 🔐 Login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("🟢 Login attempt with:", { username, password });

    try {
      // const res = await fetch('http://localhost:5000/api/auth/login', {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("🔴 Login failed:", errorData.message);
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      // console.log("✅ Login success:", data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      alert('Login Successful!');
      navigate('/eventreq');
    } catch (error) {
      alert(error.message);
      console.error('Login error:', error);
    }
  };

  // 📝 Register handler
  const handleRegister = async (e) => {
    e.preventDefault();

    // console.log("🟡 Registration attempt with:", { username, password });

    try {
      // const res = await fetch('http://localhost:5000/api/auth/register', {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("🔴 Registration failed:", errorData.message);
        throw new Error(errorData.message || 'Registration failed');
      }

      alert('Registration successful! Now please login.');

      // 🧠 Don't reset fields here so user can directly login after register
      // setUsername('');
      // setPassword('');
      setIsRegister(false); // switch to login
    } catch (error) {
      alert(error.message);
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#2B0A3D] to-[#0A1F24] flex items-center justify-center overflow-hidden">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form className="space-y-5" onSubmit={isRegister ? handleRegister : handleLogin}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border text-pink-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Toggle link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : 'New user?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-purple-600 hover:underline"
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
