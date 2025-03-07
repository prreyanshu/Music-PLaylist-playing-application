// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // We'll add styles for this page.

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Music Hub</h1>
      <p>Your one-stop destination for music, playlists, and more!</p>

      <div className="buttons-container">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
