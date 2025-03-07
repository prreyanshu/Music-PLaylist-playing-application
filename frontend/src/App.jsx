import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";
import Dashboard from "./pages/Dashboard"; // Import Dashboard

const App = () => {
  return (
    <div>
      <Header /> {/* Add the Header at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add this */}
      </Routes>
    </div>
  );
};

export default App;
