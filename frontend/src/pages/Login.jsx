import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Import API function
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigation after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await loginUser({ email, password });
      const token = response.data.token; // Extract token from response
      console.log("Login Successful, Token:", token);
  
      if (token) {
        localStorage.setItem("token", token); // ✅ Store token
        navigate("/dashboard"); // ✅ Redirect after storing token
      } else {
        setError("Invalid login response. No token received.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };
  
  
  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
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
        
        <button type="submit" className="btn login-btn">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
