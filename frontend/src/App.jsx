import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const location = useLocation();
  const authToken = localStorage.getItem("token");

  // 🔐 Protected Route Wrapper
  const ProtectedRoute = ({ element }) => {
    return authToken ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ✅ Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/playlist" element={<ProtectedRoute element={<Playlist />} />} />
      </Routes>
    </div>
  );
};

export default App;
