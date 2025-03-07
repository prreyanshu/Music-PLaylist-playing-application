import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animations
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setMessage('✅ Successfully Registered! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('❌ Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <motion.div 
        className="register-box" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2>Join Us</h2>
        {message && <p className="message">{message}</p>}
        
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="register-btn">Sign Up</button>
        </form>
        
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
