import axios from 'axios';

// ✅ Base API Configuration
const api = axios.create({
  baseURL: 'http://localhost:3000', // Your backend server URL
});

// ✅ Automatically attach JWT token for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    config.headers['x-auth-token'] = token; // Attach token to headers
  }
  return config;
});

// ✅ Handle Unauthorized Access (401) Globally
api.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem('token'); // Clear token on 401
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token); // Store token after signup
    return response;
  } catch (error) {
    console.error("Registration Error:", error.response?.data?.msg || error.message);
    throw error;
  }
};

// ✅ Login User
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    localStorage.setItem('token', response.data.token); // Store token after login
    return response;
  } catch (error) {
    console.error("Login Error:", error.response?.data?.msg || error.message);
    throw error;
  }
};

// ✅ Logout User
export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove JWT token
  window.location.href = '/login'; // Redirect to login page
};

export default api;
