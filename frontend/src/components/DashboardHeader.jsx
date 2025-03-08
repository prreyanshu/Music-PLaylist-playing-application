import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">MyMusicApp</h1>
      <div className="nav-container">
        <nav className="dashboard-nav">
          <Link to="/playlist" className="playlist-link">🎵 Playlist</Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout 🚪</button>
        </div>
    </header>
  );
};

export default DashboardHeader;
