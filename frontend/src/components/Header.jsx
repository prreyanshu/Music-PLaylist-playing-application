import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // ✅ Now useNavigate is defined

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">My Music App</h1>
      <nav>
        <Link to="/playlists" className="mr-4">Playlists</Link>
        <button onClick={() => {
          localStorage.removeItem("token"); // Logout logic
          navigate("/login"); // Redirect to login
        }} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
