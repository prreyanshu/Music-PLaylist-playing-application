import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const location = useLocation();
  const authToken = localStorage.getItem("token");

  return (
    <div>
      {/* Show DashboardHeader only if user is logged in
      {authToken && location.pathname !== "/login" && location.pathname !== "/register" && <DashboardHeader />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </div>
  );
};

export default App;
